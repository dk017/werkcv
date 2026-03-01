import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import path from 'path'

// Reads agent-status.json from the public data directory.
// Klauw (the OpenClaw agent) updates this file via git commits.
export async function GET() {
  try {
    const statusPath = path.join(process.cwd(), 'data', 'agent-status.json')
    const raw = readFileSync(statusPath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch {
    // Return empty shell if file doesn't exist yet
    return NextResponse.json({
      lastUpdated: new Date().toISOString(),
      agents: {
        orchestrator: { lastRun: null, status: 'standby', nextRun: 'Monday 08:00 Amsterdam' },
        researcher: { lastRun: null, status: 'standby' },
        writer: { lastRun: null, status: 'standby' },
        prioritizer: { lastRun: null, status: 'standby' },
        toolbuilder: { lastRun: null, status: 'standby' },
      },
      metrics: {
        pagesIndexed: 4,
        monthlyVisitors: 0,
        monthlyRevenue: 0,
        backlinks: 0,
        toolsLive: 15,
        cvExamplePages: 58,
        articlesPublished: 50,
      },
      tasks: { completed: [], inProgress: [], pending: [] },
      contentGenerated: { cvVoorbeelden: [], cvTips: [], tools: [] },
    })
  }
}
