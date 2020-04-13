import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import CameraMapBox from './CameraMapBox';

describe('CameraMapBox', () => {
  it('should call with onPress function', () => {
    const mockObj = { camera: false };
    const onPressCamera = () => mockObj.camera = true;
    const { getByTestId } = render(
      <CameraMapBox testID="camera" type="camera" onPress={onPressCamera} />
    );
    expect(mockObj.camera).toBe(false);
    fireEvent.press(getByTestId('camera'));
    expect(mockObj.camera).toBe(true);
  });
});
