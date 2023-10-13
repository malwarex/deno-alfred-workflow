type CommandParams = ConstructorParameters<typeof Deno.Command>;
const td = new TextDecoder();

export async function runCommand<DataAsArray extends boolean = false>(
  command: CommandParams[0],
  options?: CommandParams[1],
  config?: {
    /** @default 0 */
    timeout?: number;
    /** @default false */
    dataAsArray?: DataAsArray;
  }
) {
  const timeout = Math.abs(config?.timeout || 0);
  const dataAsArray = config?.dataAsArray ?? false;
  const commandOptions = options || {};
  let timeoutId: number | undefined = undefined;

  if (timeout !== 0) {
    const controller = new AbortController();
    commandOptions.signal = controller.signal;

    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  const res = await new Deno.Command(command, commandOptions).output();

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  return {
    success: res.success,
    abortedAfter: timeout || null,
    data: (() => {
      const decodedData = td.decode(res.stdout).trim();

      return (
        dataAsArray === false ? decodedData : decodedData.split("\n")
      ) as DataAsArray extends false ? string : string[];
    })(),
    error: td.decode(res.stderr).trim(),
  } as const;
}
