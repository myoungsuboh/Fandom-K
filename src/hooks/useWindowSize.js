import {throttle} from 'lodash';
import {useEffect, useState} from 'react';

const devices = {
  desktop: 1200,
  tablet: 744,
};

/**
 * 화면 사이즈로 Device가 Desktop인지 감지하는 커스텀 훅
 * @returns isDesktop : 화면 사이즈 1200 이상인지
 */
function useWindowSize() {
  // const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [device, setDevice] = useState(window.innerWidth >= devices.desktop ? 'desktop' : window.innerWidth >= devices.tablet ? 'tablet' : 'mobile');

  /**
   * throttle 이용해 500ms(delay) 간격으로 desktop인지 체크
   */
  const handleResize = throttle(() => {
    // setIsDesktop(window.innerWidth >= 1200);
    if (window.innerWidth >= devices.desktop) {
      setDevice('desktop');
    } else if (window.innerWidth >= devices.tablet) {
      setDevice('tablet');
    } else {
      setDevice('mobile');
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return device;
}

export default useWindowSize;
