import { PitchDetectorErrors } from '../../../types';
import { PitchDetectorError } from '..';

describe('Errors', () => {
  it('should create base error', () => {
    const error: any = new PitchDetectorError(PitchDetectorErrors.BASE);

    expect(error?.message).toMatch(/You are not using Expo Go/);
    expect(error?.message).toMatch(
      /You rebuilt the app after installing the package/
    );
  });

  it('should create link error', () => {
    const error: any = new PitchDetectorError(
      PitchDetectorErrors.LINKING_ERROR
    );

    expect(error?.message).toMatch(/doesn't seem to be linked/);
  });

  it('should create permission error', () => {
    const error: any = new PitchDetectorError(
      PitchDetectorErrors.PERMISSIONS_ERROR
    );

    expect(error?.message).toMatch(/need audio record permission/);
  });
});
