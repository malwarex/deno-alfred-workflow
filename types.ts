type Mod = "cmd" | "alt" | "ctrl" | "shift" | "fn";
type UnknownObject = Record<string, unknown>;

type AllModsCombination = `${Mod}+${Mod}`;
type SameModsCombination<T = Mod> = T extends infer R extends string
  ? `${R}+${R}`
  : never;

type Mods = Mod | Exclude<AllModsCombination, SameModsCombination>;

export interface ScriptFilterItem {
  title: string;
  arg: string | string[];
  subtitle?: string;
  uid?: string;
  icon?: {
    path: string;
    type?: "fileicon" | "filetype";
  };
  valid?: boolean;
  match?: string;
  autocomplete?: string;
  type?: "default" | "file" | "file:skipcheck";
  mods?: {
    [K in Mods]+?: {
      valid: boolean;
      arg: string;
      subtitle: string;
    };
  };
  action?:
    | string
    | string[]
    | { text: string[]; url: string; file: string; auto: string };
  text?: { copy: string; largetype: string };
  quicklookurl?: string;
  return?:
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1
    | 1.1
    | 1.2
    | 1.3
    | 1.4
    | 1.5
    | 1.6
    | 1.7
    | 1.8
    | 1.9
    | 2
    | 2.1
    | 2.2
    | 2.3
    | 2.4
    | 2.5
    | 2.6
    | 2.7
    | 2.8
    | 2.9
    | 3
    | 3.1
    | 3.2
    | 3.3
    | 3.4
    | 3.5
    | 3.6
    | 3.7
    | 3.8
    | 3.9
    | 4
    | 4.1
    | 4.2
    | 4.3
    | 4.4
    | 4.5
    | 4.6
    | 4.7
    | 4.8
    | 4.9
    | 5;
  skipknowledge?: boolean;
}

export interface ScriptFilter {
  items: ScriptFilterItem[];
  variables: UnknownObject;
}

export interface JsonConfig {
  alfredworkflow: {
    arg: string;
    config: UnknownObject;
    variables: UnknownObject;
  };
}
