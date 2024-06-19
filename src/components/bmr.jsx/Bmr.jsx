import "./Bmr.scss";
const Bmr = () => {
  return (
    <div className="bmr">
      <div className="bmr__container">
        <form action="">
          <h1>BMR & DAILY CALORIE CALCULATOR</h1>

          <div className="bmr__gender">
            <label className="bmr__label">Gender</label>
            <div className="bmr__option">
              <input
                type="radio"
                name="female"
                className="bmr__gender-female"
              />
              <label className="bmr__label-side">Female</label>
            </div>
            <div className="bmr__option">
              <input type="radio" name="male" className="bmr__gender-male" />{" "}
              <label className="bmr__label-side">Male</label>
            </div>
          </div>

          <div className="bmr__weight">
            <label className="bmr__label">Weight</label>
            <div className="bmr__option">
              <input
                type="radio"
                name="units"
                className="bmr__units-imperial"
              />
              <label className="bmr__label-side">Imperial (in lbs)</label>{" "}
            </div>
            <div className="bmr__option">
              <input type="radio" name="units" className="bmr__units-metric" />
              <label className="bmr__label-side">Metric (in kgs)</label>
              <input
                type="number"
                name="weight"
                className="bmr__weight-input"
                min={0}
                max={999}
              />
            </div>
          </div>

          <div className="bmr__height">
            <label className="bmr__label">Height in feet and inches</label>
            <div className="bmr__height-input">
              <input
                type="number"
                name="heightFeet"
                className="bmr__feet-input"
                min={0}
                max={8}
              />
              <input
                type="number"
                name="heightInches"
                className="bmr__inches-input"
                min={0}
                max={11}
              />
            </div>
          </div>

          <div className="bmr__age">
            <label className="bmr__label">Age</label>
            <input
              type="number"
              name="age"
              className="bmr__age-input"
              min={0}
              max={120}
            />
          </div>
          <button type="bmr__button-bmr">Calculate BMR</button>
          <div className="bmr__workout">
            <div className="bmr__workout-options">
              <label className="bmr__label">Workout in a Week</label>
              <select className="bmr__activity" name="activity">
                <option value="">Select your Activity</option>
                <option value="">
                  Sedentary (Very little or no exercise, and desk job)
                </option>
                <option value="">
                  Lightly Active (Light exercise 1 to 3 days per week)
                </option>
                <option value="">
                  Moderately Active (Moderate exercise 3 to 5 days per week)
                </option>
                <option value="">
                  Very Active (Heavy exercise 6 to 7 days per week)
                </option>
                <option value="">
                  Extremely Active (Very intense exercise, and physical job,
                  exercise multiple times per day)
                </option>
              </select>
            </div>
            <button type="button">Calculate Calories</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bmr;
