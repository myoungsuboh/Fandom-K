import GradientButton from 'components/common/GradientButton';
import parseImg from 'utils/images.js';
import Chart from './Chart';

function MonthlyChart({onClick}) {
  return (
    <div className="monthly-chart-container">
      <div className="monthly-chart">
        <div className="chart-header">
          <div className="chart-header-title">이달의 차트</div>
          <GradientButton handleClick={onClick} name="monthly-chart-gradient-btn">
            <img src={parseImg('ic_chart.svg')} alt="차트아이콘" />
            <div>투표하러 가기</div>
          </GradientButton>
        </div>
        <Chart />
      </div>
    </div>
  );
}

export default MonthlyChart;
