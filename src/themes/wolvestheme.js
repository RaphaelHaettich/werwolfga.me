import {
  cyan700,
  grey600,
  grey900,
  pinkA400,
  pinkA100,
  fullWhite,
  red900,
} from 'material-ui/styles/colors';
import { fade, } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

export default {
  spacing: Spacing.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: red900,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: grey900,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: (0, fade)(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: (0, fade)(fullWhite, 0.3),
    disabledColor: (0, fade)(fullWhite, 0.3),
    pickerHeaderColor: (0, fade)(fullWhite, 0.12),
    clockCircleColor: (0, fade)(fullWhite, 0.12),
  },
};
