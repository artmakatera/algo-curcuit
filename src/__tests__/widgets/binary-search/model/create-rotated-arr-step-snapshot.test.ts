
import { LANGUAGES, STEPS } from "@/widgets/binary-search-visualize/model/constants";
import { createRotatedBSStepSnapshot as createStepSnapshot } from "@/widgets/binary-search-visualize/model";



import { expect, describe, it } from 'vitest'
import test from "node:test";


describe('createRotatedBSStepSnapshot', () => {
  test('should return a StepSnapshot', () => {
    const payload = {
      type: STEPS.ifStart,
      start: 0,
      end: 1,
      middleIndex: 0,
      result: -1
    }
    const result = createStepSnapshot(payload, LANGUAGES.javascript)
    expect(result).toEqual({
      type: STEPS.ifStart,
      result: -1,
      compareIndexes: [0, 1],
      checkIndex: 0,
      highlightLines: [5, 17, 12, 13, 14]
    })
  }
  );
  test('should return a StepSnapshot with default language', () => {
    const payload = {
      type: STEPS.ifStart,
      start: 0,
      end: 1,
      middleIndex: 0,
      result: -1
    }
    const result = createStepSnapshot(payload)
    expect(result).toEqual({
      type: STEPS.ifStart,
      result: -1,
      compareIndexes: [0, 1],
      checkIndex: 0,
      highlightLines: [5, 17, 12, 13, 14]
    })
  }
  );

  
});