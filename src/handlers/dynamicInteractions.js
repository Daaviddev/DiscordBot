const { log } = require('../functions');

async function registerDynamicComponent(client, fileName, componentType) {
  try {
    const module = require('../interactions/dynamic/' +
      componentType +
      '/' +
      fileName);

    if (componentType === 'buttons') {
      if (!module.customId || !module.run) {
        log(
          'Unable to load the component ' +
            fileName +
            " due to missing 'structure#customId' or/and 'run' properties.",
          'warn'
        );
      }

      client.collection.dynamicComponents.buttons.set(module.customId, module);
    } else if (componentType === 'selects') {
      if (!module.customId || !module.run) {
        log(
          'Unable to load the select menu ' +
            fileName +
            " due to missing 'structure#customId' or/and 'run' properties.",
          'warn'
        );
      }

      client.collection.dynamicComponents.selects.set(module.customId, module);
    } else if (componentType === 'modals') {
      if (!module.customId || !module.run) {
        log(
          'Unable to load the modal ' +
            fileName +
            " due to missing 'structure#customId' or/and 'run' properties.",
          'warn'
        );
      }
      console.log('moduleId: ', module.customId);
      client.collection.dynamicComponents.modals.set(module.customId, module);
    } else {
      log('Invalid component type: ' + fileName, 'warn');
    }

    log('Loaded new component: ' + fileName, 'info');
  } catch (error) {
    console.log(error);
  }
}
function unregisterDynamicComponent(client, componentType, customId) {
  try {
    // Check if the component type collection exists
    if (client.collection.dynamicComponents[componentType]) {
      // Delete the component with the specified customId
      client.collection.dynamicComponents[componentType].delete(customId);
      log(
        `Successfully unregistered dynamic component: ${customId} from ${componentType}`,
        'info'
      );
    } else {
      log(
        `Component type ${componentType} does not exist in dynamicComponents collection`,
        'warn'
      );
    }
  } catch (error) {
    log(
      `Error unregistering dynamic component: ${customId} from ${componentType}: ${error}`,
      'error'
    );
  }
}

module.exports = {
  registerDynamicComponent,
  unregisterDynamicComponent,
};
