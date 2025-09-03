// src/lib/startCron.js
import { startPlanExpiryCron } from "./planExpiryCron";

let cronStarted = false;

export default function initCron() {
  if (cronStarted) return;
  cronStarted = true;

  startPlanExpiryCron();
  console.log("✅ Plan expiry cron initialized");
}
