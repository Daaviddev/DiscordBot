const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
const path = require("path");
const config = require("./src/config.json");

const commands = [];
const commandsPath = path.join(__dirname, "src", "commands");

// Iterate through each category of commands
for (const category of readdirSync(commandsPath)) {
  const categoryPath = path.join(commandsPath, category);

  // Iterate through each command file in the category
  for (const file of readdirSync(categoryPath).filter((file) =>
    file.endsWith(".js")
  )) {
    try {
      const filePath = path.join(categoryPath, file);
      const command = require(filePath);

      if (!command.data) {
        console.warn(
          `The command '${file}' does not export a 'data' property.`
        );
        continue;
      }

      commands.push(command.data.toJSON());
      console.log(`Loaded command '${file}' from category '${category}'.`);
    } catch (error) {
      console.error(
        `Error loading command '${file}' from category '${category}':`,
        error
      );
    }
  }
}

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
