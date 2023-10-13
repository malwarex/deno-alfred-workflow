import type { ScriptFilter, ScriptFilterItem } from "./types.ts";
import { print } from "./print.ts";

export function scriptFilterFactory() {
  const scriptFilter: ScriptFilter = {
    items: [],
    variables: {},
  };

  return {
    appendItem(item: ScriptFilterItem) {
      scriptFilter.items.push(item);
    },

    setItems(items: ScriptFilter["items"]) {
      scriptFilter.items = items;
    },

    setVariables(variables: ScriptFilter["variables"]) {
      scriptFilter.variables = variables;
    },

    getFilter() {
      return scriptFilter;
    },

    printFilter() {
      print(scriptFilter);
    },
  };
}
