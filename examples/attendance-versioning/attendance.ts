export type AttendanceStatus = "present" | "absent";

export type Snapshot = Readonly<{
  status: AttendanceStatus | null;
  version: number;
}>;

type SaveResult =
  | { kind: "saved"; snapshot: Snapshot }
  | { kind: "conflict"; snapshot: Snapshot };

export class AttendanceRecord {
  #snapshot: Snapshot = Object.freeze({ status: null, version: 0 });

  read(): Snapshot {
    return this.#snapshot;
  }

  save(expectedVersion: number, status: AttendanceStatus): SaveResult {
    const current = this.#snapshot;

    if (expectedVersion !== current.version) {
      return { kind: "conflict", snapshot: current };
    }

    const snapshot = Object.freeze({ status, version: current.version + 1 });
    this.#snapshot = snapshot;
    return { kind: "saved", snapshot };
  }
}
