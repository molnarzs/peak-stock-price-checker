export abstract class SymbolWatchService {
  abstract startWatching(symbol: string, command: VoidFunction): Promise<void>;
  abstract isWatching(symbol: string): Promise<boolean>;
}
