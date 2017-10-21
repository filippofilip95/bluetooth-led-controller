import { Platform, StyleSheet } from 'react-native';
import Constants from './constants';
import Sizes from './sizes';

export default StyleSheet.create({
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  optionsIcon: {
    marginRight: 16,
    color: Constants.BLACK,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
  middleAligned: {
    alignItems: 'center',
  },
  verticalMiddleAligned: {
    justifyContent: 'center',
  },
  spaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },

  // Text Styles
  body: {
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 14,
    color: Constants.TEXT_COLOR,
    fontWeight: '300',
  },
  body2: {
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 14,
    color: Constants.TEXT_COLOR,
    fontWeight: '300',
    opacity: 0.87,
  },
  subheading: {
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 17,
    color: Constants.TEXT_COLOR,
  },
  title: {
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 35,
    color: Constants.TEXT_COLOR,
    fontWeight: '700',
  },
  link: {
    color: Constants.PRIMARY_COLOR,
    fontWeight: '500',
  },
  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },

  // Give me margin
  margin: {
    marginVertical: Sizes.margin,
    marginHorizontal: Sizes.margin,
  },
  marginSml: {
    marginVertical: Sizes.marginSml,
    marginHorizontal: Sizes.marginSml,
  },
  marginBottom: {
    marginBottom: Sizes.margin,
  },
  marginLeft: {
    marginLeft: Sizes.margin,
  },
  marginRight: {
    marginRight: Sizes.margin,
  },
  marginBottomSml: {
    marginBottom: Sizes.marginSml,
  },
  marginTopSml: {
    marginTop: Sizes.marginSml,
  },
  marginLeftSml: {
    marginLeft: Sizes.marginSml,
  },
  marginRightSml: {
    marginRight: Sizes.marginSml,
  },
  marginVerticalSml: {
    marginVertical: Sizes.marginSml,
  },
  marginHorizontal: {
    marginHorizontal: Sizes.margin,
  },
  marginHorizontalSml: {
    marginHorizontal: Sizes.marginSml,
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    padding: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  //shadow

  shadow: {
    marginBottom: Sizes.paddingSml,
    elevation: 1,
    shadowOpacity: 0.1815,
    shadowRadius: 0.54,
    shadowOffset: {
      height: 0.6,
    },
  },

  ///Material elements
  materialCard: {
    marginBottom: Sizes.paddingSml,
    marginHorizontal: Sizes.paddingSml,
    padding: Sizes.padding,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Constants.WHITE,
    elevation: 1,
    shadowOpacity: 0.1815,
    shadowRadius: 0.54,
    shadowOffset: {
      height: 0.6,
    },
  },
  borderBottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.BORDER,
  },
  borderTopLine: {
    borderTopWidth: 1,
    borderTopColor: Constants.BORDER,
  },

  // Grid
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
});
