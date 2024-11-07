import GradientButton from 'components/common/GradientButton';
import ProfileBadge from 'components/common/ProfileBadge';
import ProfileDelete from 'components/common/ProfileDelete';
import Nav from 'components/nav/Nav';
import MyCredit from 'components/myCredit/MyCredit';
import MonthlyChart from 'components/monthlyChart/MontlyChart';

function Components() {
  const handleProfileDelete = value => {
    console.log(value);
  };
  return (
    <>
      <Nav />
      <MyCredit />
      <MonthlyChart />
      <div
        style={{
          padding: '1rem',
          marginBottom: '1rem',
          border: '0.1rem solid #000',
        }}
      >
        <div
          style={{
            fontSize: '1.6rem',
            lineHeight: '1.3',
            marginBottom: '1rem',
          }}
        >
          Gradient Button 컴포넌트
          <br />
          font, padding, margin, width 같은 스타일은 사용하는 컴포넌트나 페이지에서 추가해주세요.
          <br />
          name prop은 클래스를 추가하기 위한 prop입니다. string (&apos;class&apos;) | string 배열([&apos;class1&apos;, &apos;class2&apos;]) 형태로
          사용해주세요.
        </div>
        <GradientButton name="btn1">Gradient Button</GradientButton>
        <hr />
        <GradientButton name={['btn1', 'btn2']}>Gradient Button</GradientButton>
      </div>
      <div
        style={{
          padding: '1rem',
          marginBottom: '1rem',
          border: '0.1rem solid #000',
        }}
      >
        <div
          style={{
            fontSize: '1.6rem',
            lineHeight: '1.3',
            marginBottom: '1rem',
          }}
        >
          ProfileBadge 컴포넌트
          <br />
          img prop은 &apos;이미지.확장자&apos; 형태로 사용해주세요.
          <br />
          size prop은 작성하지 않거나 &apos;medium&apos; | &apos;large&apos; 형태로 사용해주세요.
          <br />
          selected prop은 임시입니다. 추후 state로 변경할 예정입니다.
        </div>
        <ProfileBadge img="img_idol_example.svg" />
        <hr />
        <ProfileBadge img="img_idol_example.svg" size="medium" />
        <hr />
        <ProfileBadge img="img_idol_example.svg" size="large" />
        <hr />
        <ProfileBadge img="img_idol_example.svg" selected={true} />
        <hr />
        <ProfileDelete img="img_idol_example.svg" onClick={handleProfileDelete} />
        <ProfileDelete img="img_idol_example.svg" size="medium" onClick={handleProfileDelete} />
        <ProfileDelete img="img_idol_example.svg" size="large" onClick={handleProfileDelete} />
        <hr />
      </div>
    </>
  );
}

export default Components;
