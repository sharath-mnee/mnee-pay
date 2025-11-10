const APYBanner = () => (
  <div
    className="rounded-lg p-4 mb-6 flex flex-col justify-center"
    style={{
      background: 'linear-gradient(90deg, #F0FDFA 0%, #FFF7ED 100%)',
      border: '1px solid #E5E5E5',
      width: '404px',
      height: '108px',
    }}
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="text-2xl">🎉</span>
      <span className="font-semibold text-gray-800">Coming soon: APY rewards!</span>
    </div>
    <p className="text-sm text-gray-600">
      Earn 4.5% yield rewards on your MNEE balance
    </p>
  </div>
);

export default APYBanner;
