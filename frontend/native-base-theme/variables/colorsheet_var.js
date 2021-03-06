import color from 'color';

import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const isIphoneX = platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;

export default {
  platformStyle: 'material',
  platform: 'ios',

  // Accordion
  headerStyle: '#edebed',
  iconStyle: '#000',
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  accordionBorderColor: '#d3d3d3',
  disableRow: '#a9a9a9',

  // ActionSheet
  elevation: 4,
  containerTouchableBackgroundColor: 'rgba(0,0,0,0.4)',
  innerTouchableBackgroundColor: '#fff',
  listItemHeight: 50,
  listItemBorderColor: 'transparent',
  marginHorizontal: -15,
  marginLeft: 14,
  marginTop: 15,
  minHeight: 56,
  padding: 15,
  touchableTextColor: '#757575',

  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  btnUppercaseAndroidText: true,

  badgeBg: 'rgba(107,157,158,1)',
  badgeColor: '#fff',
  badgePadding: 3,

  btnFontFamily: 'System',
  btnDisabledBg: '#b5b5b5',
  buttonPadding: 6,
  btnPrimaryBg: 'rgba(107,157,158,1)',
  btnPrimaryColor: '#fff',
  btnInfoBg: 'rgba(125,109,97,1)',
  btnInfoColor: '#fff',
  btnSuccessBg: 'rgba(188,217,121,1)',
  btnSuccessColor: '#fff',
  btnDangerBg: '#d9534f',
  btnDangerColor: '#fff',
  btnWarningBg: '#f0ad4e',
  btnWarningColor: '#fff',
  btnTextSize: 16.5,
  btnTextSizeLarge: 22.5,
  btnTextSizeSmall: 12,
  borderRadiusLarge: 57,
  iconSizeLarge: 45,
  iconSizeSmall: 18,

  cardDefaultBg: 'rgba(228,240,208,1)',
  cardBorderColor: '#ccc',

  CheckboxRadius: 0,
  CheckboxBorderWidth: 2,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: 0,
  CheckboxIconSize: 18,
  CheckboxFontSize: 21,
  DefaultFontSize: 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 20,
  checkboxTickColor: '#fff',

  brandPrimary: 'rgba(107,157,158,1)',
  brandInfo: '#3F57D3',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#f4f4f4',

  fontFamily: 'System',
  fontSizeBase: 15,
  fontSizeH1: 27,
  fontSizeH2: 24,
  fontSizeH3: 21,

  footerHeight: 55,
  footerDefaultBg: 'rgba(195,223,224,1)',
  footerPaddingBottom: 0,

  tabBarTextColor: '#fff',
  tabBarTextSize: 14,
  activeTab: '#fff',
  sTabBarActiveTextColor: 'rgba(107,157,158,1)',
  tabBarActiveTextColor: '#fff',
  tabActiveBgColor: 'rgba(195,223,224,1)',

  toolbarBtnColor: '#fff',
  toolbarDefaultBg: 'rgba(195,223,224,1)',
  toolbarHeight: 64,
  toolbarSearchIconSize: 20,
  toolbarInputColor: '#fff',

  searchBarHeight: 30,
  searchBarInputHeight: 30,
  toolbarBtnTextColor: '#fff',
  toolbarDefaultBorder: 'rgba(195,223,224,1)',
  iosStatusbar: 'light-content',
  statusBarColor: '#32408F',
  darkenHeader: '#F0F0F0',

  iconFamily: 'Ionicons',
  iconFontSize: 30,
  iconHeaderSize: 29,

  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: 'rgba(188,217,121,1)',
  inputErrorBorderColor: '#ed2f2f',
  inputHeightBase: 50,
  inputColor: 'rgba(157,173,111,1)',
  inputColorPlaceholder: '#575757',

  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: 20,

  listBg: '#FFF', ///might need to change
  listBorderColor: 'rgba(192,220,173,1)',
  listDividerBg: 'rgba(188,217,121,1)',
  listBtnUnderlayColor: '#DDD',
  listItemPadding: 10,
  listNoteColor: '#808080',
  listNoteSize: 13,

  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',
  
  radioBtnSize: 25,
  radioSelectedColorAndroid: '#5067FF',
  radioBtnLineHeight: 29,

  segmentBackgroundColor: 'rgba(195,223,224,1)',
  segmentActiveBackgroundColor: '#fff',
  segmentTextColor: '#fff',
  segmentActiveTextColor: 'rgba(157,173,111,1)',
  segmentBorderColor: '#fff',
  segmentBorderColorMain: '#3F51B5',

  defaultSpinnerColor: 'rgba(107,157,158,1)',
  inverseSpinnerColor: '#1A191B',

  tabDefaultBg: '#3F51B5',
  topTabBarTextColor: '#b3c7f9',
  topTabBarActiveTextColor: '#fff',
  topTabBarBorderColor: '#fff',
  topTabBarActiveBorderColor: '#fff',

  tabBgColor: '#F8F8F8',
  tabFontSize: 15,

  textColor: 'rgba(0,0,0,1)',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  defaultTextColor: '#000',

  titleFontfamily: 'System',
  titleFontSize: 19,
  subTitleFontSize: 14,
  subtitleColor: '#FFF',
  titleFontColor: '#FFF',

  borderRadiusBase: 2,
  borderWidth: 1,
  contentPadding: 10,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth: 1235,
  deviceHeight: 918,
  isIphoneX: false,
  inputGroupRoundedBorderRadius: 30,
};
