export const DRAWER_WIDTH = 220;

export const APPBAR_HEIGHT_XS = 56;
export const APPBAR_HEIGHT_SM = 64;

export const getAppBarOffsetSx = () => ({
  top: { xs: APPBAR_HEIGHT_XS, sm: APPBAR_HEIGHT_SM },
  height: {
    xs: `calc(100% - ${APPBAR_HEIGHT_XS}px)`,
    sm: `calc(100% - ${APPBAR_HEIGHT_SM}px)`,
  },
});

export const getStickyTopSx = () => ({
  top: { xs: APPBAR_HEIGHT_XS, sm: APPBAR_HEIGHT_SM },
});
