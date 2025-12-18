import cron from "node-cron";

cron.schedule("* * * * *", async () => {
    try {
        const response = await fetch(`${process.env.SERVER}`, {
            method: "GET",
        });

        const data = await response.json();

        console.log("Task running every 1 minute");
        console.log("Fetched data count:", data.length);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
