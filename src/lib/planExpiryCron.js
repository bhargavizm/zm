// src/lib/planExpiryCron.js
import cron from "node-cron";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { triggerMessage } from "@/lib/mailer/triggerMessage";

// Days before expiry to send reminders
const reminderWindows = [7, 5, 3, 2, 1, 0];

export function startPlanExpiryCron() {
  // Runs every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    try {
      await connectDB();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      console.log("[Cron] Checking services for expiry reminders:", today.toDateString());

      for (const serviceName in serviceModelMap) {
        const model = serviceModelMap[serviceName];
        const services = await model.find({ "priceDetails.endDate": { $exists: true } });

        for (const service of services) {
          if (!service.priceDetails || !service.user?.id) continue;

          const endDate = new Date(service.priceDetails.endDate);
          endDate.setHours(0, 0, 0, 0);

          const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

          if (!Array.isArray(service.priceDetails.reminderSent)) {
            service.priceDetails.reminderSent = [];
          }

          if (reminderWindows.includes(diffDays) && !service.priceDetails.reminderSent.includes(diffDays)) {
            const user = await User.findById(service.user.id);
            if (!user) continue;

            await triggerMessage(
              user,
              "planExpiryReminder",
              `Your ${serviceName} plan will expire in ${diffDays} day(s) on ${endDate.toDateString()}. Renew soon to continue using the service!`
            );

            service.priceDetails.reminderSent.push(diffDays);
            await service.save();

            console.log(`[Cron] Reminder sent to ${user.email} for ${serviceName} (diffDays=${diffDays})`);
          }
        }
      }

      console.log("✅ Plan expiry reminders check complete");
    } catch (err) {
      console.error("❌ Error sending plan reminders:", err);
    }
  });
}
