$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$serverPort = 8787
$node = "node"
$ngrok = Join-Path $root "node_modules\.bin\ngrok.cmd"
$serverScript = Join-Path $root "mcp-servers\filesystem\server.js"

if (-not (Test-Path $ngrok)) {
  throw "ngrok binary not found. Run npm install first."
}

if (-not $env:NGROK_AUTHTOKEN) {
  throw "Set NGROK_AUTHTOKEN before running this script."
}

function Stop-PortListener($port) {
  $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
  foreach ($conn in $conns) {
    if ($conn.OwningProcess) {
      Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
  }
}

Stop-PortListener $serverPort
Stop-PortListener 4040

Write-Host "Starting MCP server..."
$serverProcess = Start-Process -FilePath $node -ArgumentList "`"$serverScript`"" -PassThru

for ($i = 0; $i -lt 20; $i++) {
  if (Get-NetTCPConnection -LocalPort $serverPort -ErrorAction SilentlyContinue) {
    break
  }
  Start-Sleep -Milliseconds 250
}
if (-not (Get-NetTCPConnection -LocalPort $serverPort -ErrorAction SilentlyContinue)) {
  throw "MCP server did not start on port $serverPort."
}

Write-Host "Configuring ngrok authtoken..."
& $ngrok config add-authtoken $env:NGROK_AUTHTOKEN | Out-Host

try {
  Write-Host "Starting ngrok tunnel..."
  Write-Host "MCP server: http://localhost:$serverPort/mcp"
  Write-Host "Keep this window open."
  Write-Host "Press Ctrl+C to stop."
  & $ngrok http $serverPort
}
finally {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Stop-Process -Id $serverProcess.Id -Force
  }
}
