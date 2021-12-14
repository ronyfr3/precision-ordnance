import React from "react";

import classes from "./CivilianMilitaryMembershipEvents.module.css";

const CivilianMilitaryMembershipEvents = () => {
  return (
    <section className={classes.civilianMilitaryMembershipEventsSection}>
      <div className={classes.civilianMilitaryMembershipEventsContent}>
        <div>
          <img src="/images/civilian.png" alt="Civilian" />
          <h3>Civilian Training</h3>
        </div>
        <div>
          <img src="/images/military.png" alt="Military" />
          <h3>Military Training</h3>
        </div>
        <div>
          <img src="/images/membership.png" alt="Membership" />
          <h3>Membership</h3>
        </div>
        <div>
          <img src="/images/events.png" alt="Events" />
          <h3>Events</h3>
        </div>
      </div>
    </section>
  );
};

export default CivilianMilitaryMembershipEvents;
