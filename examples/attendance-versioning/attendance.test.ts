import assert from "node:assert/strict";
import test from "node:test";
import { AttendanceRecord } from "./attendance.ts";

test("unrecorded attendance is distinct from an explicit absence", () => {
  const record = new AttendanceRecord();
  assert.deepEqual(record.read(), { status: null, version: 0 });
  assert.deepEqual(record.save(0, "absent"), {
    kind: "saved",
    snapshot: { status: "absent", version: 1 },
  });
});

test("two editors starting from the same version cannot overwrite the first save", () => {
  const record = new AttendanceRecord();
  const first = record.read();
  const second = record.read();

  record.save(first.version, "present");

  assert.deepEqual(record.save(second.version, "absent"), {
    kind: "conflict",
    snapshot: { status: "present", version: 1 },
  });
  assert.deepEqual(record.read(), { status: "present", version: 1 });
});

test("an editor can review the latest version and submit a new edit", () => {
  const record = new AttendanceRecord();
  record.save(0, "present");

  const current = record.read();
  assert.deepEqual(record.save(current.version, "absent"), {
    kind: "saved",
    snapshot: { status: "absent", version: 2 },
  });
});
