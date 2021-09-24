import * as typeHelper from './typeHelper';

describe('TypeHelper', () => {
  describe('isNull()', () => {
    it('is working, true', async () => {
      const value = null;
      expect(typeHelper.isNull(value)).toBe(true)
    })
    it('is working, false', async () => {
      const value = 1;
      expect(typeHelper.isNull(value)).toBe(false)
    })
  })
})