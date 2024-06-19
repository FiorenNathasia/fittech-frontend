import "./Bmr.scss";
const Bmr = () => {
  return (
    <div className="bmr">
      <div className="bmr__container">
        <form action="">
          <h1>BMR & DAILY CALORIE CALCULATOR</h1>
          <label className="bmr__label">Gender</label>
          <label className="bmr__label-side">Female</label>
          <input type="radio" name="female" className="bmr__gender-female" />
          <label className="bmr__label-side">Male</label>
          <input type="radio" name="male" className="bmr__gender-male" />
          <label className="bmr__label">Weight</label>
          <label className="bmr__label-side">Imperial (in lbs)</label>
          <input type="radio" name="units" className="bmr__units-imperial" />
          <label className="bmr__label-side">Metric (in kgs)</label>
          <input type="radio" name="units" className="bmr__units-metric" />
        </form>
      </div>
    </div>
  );
};

export default Bmr;
