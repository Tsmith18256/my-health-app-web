import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Array polyfills', () => {
  let originalToSpliced: typeof Array.prototype.toSpliced;

  describe('toSpliced', () => {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7];

    beforeAll(async () => {
      originalToSpliced = Array.prototype.toSpliced;

      // @ts-expect-error - Need to figure out how to fix this.
      await import('./array.polyfills');
    });

    afterAll(() => {
      // eslint-disable-next-line no-extend-native -- Returning to native function after testing polyfill.
      Array.prototype.toSpliced = originalToSpliced;
    });

    it('should not modify the original array', () => {
      const baseArrCopy = [...baseArr];
      baseArr.toSpliced(3);

      expect(baseArr).toStrictEqual(baseArrCopy);
    });

    it('should return the first x elements if only start is provided', () => {
      const res = baseArr.toSpliced(3);

      expect(res).toStrictEqual([0, 1, 2]);
    });

    it('should return without the last x elements if only negative start is provided', () => {
      const res = baseArr.toSpliced(-3);

      expect(res).toStrictEqual([0, 1, 2, 3, 4]);
    });

    it('should return an empty array if only start of 0 is provided', () => {
      const res = baseArr.toSpliced(0);

      expect(res).toStrictEqual([]);
    });

    it('should return all elements if start is more than array length', () => {
      const res = baseArr.toSpliced(500);

      expect(res).toStrictEqual(baseArr);
    });

    it('should behave like start 0 if start is negative by more than array length', () => {
      const res = baseArr.toSpliced(-500);

      expect(res).toStrictEqual([]);
    });

    it('should remove x elements if delete count is provided', () => {
      const res = baseArr.toSpliced(0, 2);

      expect(res).toStrictEqual([2, 3, 4, 5, 6, 7]);
    });

    it('should remove elements from correct place if start is provided', () => {
      const res = baseArr.toSpliced(5, 1);

      expect(res).toStrictEqual([0, 1, 2, 3, 4, 6, 7]);
    });

    it('should remove x elements if delete count is provided and start is negative', () => {
      const res = baseArr.toSpliced(-3, 2);

      expect(res).toStrictEqual([0, 1, 2, 3, 4, 7]);
    });

    it('should remove all elements if delete count is more than array length', () => {
      const res = baseArr.toSpliced(0, 500);

      expect(res).toStrictEqual([]);
    });

    it('should add items to correct index', () => {
      const res = baseArr.toSpliced(3, 0, 10, 11);

      expect(res).toStrictEqual([0, 1, 2, 10, 11, 3, 4, 5, 6, 7]);
    });

    it('should add items to correct negative index', () => {
      const res = baseArr.toSpliced(-2, 0, 10, 11);

      expect(res).toStrictEqual([0, 1, 2, 3, 4, 5, 10, 11, 6, 7]);
    });

    it('should add items to the end if start is greater than array length', () => {
      const res = baseArr.toSpliced(500, 0, 10, 11);

      expect(res).toStrictEqual([...baseArr, 10, 11]);
    });

    it('should delete all items after start and add to end if delete count is infinity', () => {
      const res = baseArr.toSpliced(2, Infinity, 10);

      expect(res).toStrictEqual([0, 1, 10]);
    });
  });

  describe('toSorted', () => {
    const baseArr = [4, 5, 0, 6, 2, 1, 3, 7];

    it('should not modify the original array', () => {
      const baseArrCopy = [...baseArr];

      baseArr.toSorted();

      expect(baseArr).toStrictEqual(baseArrCopy);
    });

    it('should sort elements', () => {
      const res = baseArr.toSorted();

      expect(res).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    it('should sort elements using comparator', () => {
      const res = baseArr.toSorted((a, b) => b - a);

      expect(res).toStrictEqual([7, 6, 5, 4, 3, 2, 1, 0]);
    });

    it('should not modify sorting when comparator returns 0', () => {
      // This comparator sorts even numbers in front of odd numbers. The even numbers should still appear in the same
      // order as the original, though. Same for odd numbers.
      const res = baseArr.toSorted((a, b) => {
        const isAEven = a % 2 === 0;
        const isBEven = b % 2 === 0;

        if (isAEven && !isBEven) {
          return -1;
        }

        if (!isAEven && isBEven) {
          return 1;
        }

        return 0;
      });

      expect(res).toStrictEqual([4, 0, 6, 2, 5, 1, 3, 7]);
    });
  });
});
