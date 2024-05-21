import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from '../../constants/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'djahggo8g',
      api_key: '343182612515533',
      api_secret: 'GA_vbcHwPEs1kntiezP-7VfgFX8',
    });
  },
};
