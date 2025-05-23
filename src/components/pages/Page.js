//css
import "../../styles/page.css";
//assets
import animation from "../../assets/animation/Bird.riv";
//components
import Signin from "../Signin";
//react
import { useEffect, useState, useCallback } from "react";
import Signup from "../Signup";
//rive
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
//react
import { useNavigate, useLocation } from "react-router-dom";

const STATE_MACHINE_NAME = "State Machine 1";

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [facingRight, setFacingRight] = useState(false);
  const [stateMachine, setStateMachine] = useState({
    start: true,
    walk: true,
    faceRight: true,
  });

  const { rive, RiveComponent } = useRive({
    src: animation,
    autoplay: true,
    artboard: "Bird",
    stateMachines: STATE_MACHINE_NAME,
  });

  const { rive: rive2, RiveComponent: RiveComponentMobile } = useRive({
    src: animation,
    autoplay: true,
    artboard: "Bird",
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateStartMobile = useStateMachineInput(rive2, STATE_MACHINE_NAME, "start");
  const stateWalkMobile = useStateMachineInput(rive2, STATE_MACHINE_NAME, "walk");
  const stateStart = useStateMachineInput(rive, STATE_MACHINE_NAME, "start");
  const stateWalk = useStateMachineInput(rive, STATE_MACHINE_NAME, "walk");
  const stateFaceRight = useStateMachineInput(rive, STATE_MACHINE_NAME, "faceRight");

  const triggerStartMobile = useCallback((value) => {
    if (stateStartMobile) {
      stateStartMobile.value = value;
    }
  }, [stateStartMobile]);

  const triggerWalkMobile = useCallback((value) => {
    if (stateWalkMobile) {
      stateWalkMobile.value = value;
    }
  }, [stateWalkMobile]);

  const triggerStart = useCallback((value) => {
    if (stateStart) {
      stateStart.value = value;
    }
  }, [stateStart]);

  const triggerWalk = useCallback((value) => {
    if (stateWalk) {
      stateWalk.value = value;
    }
  }, [stateWalk]);

  const triggerFaceRight = useCallback((value) => {
    if (stateFaceRight) {
      stateFaceRight.value = value;
    }
  }, [stateFaceRight]);

  const start = useCallback(() => {
    setStateMachine((prevState) => ({
      ...prevState,
      start: true,
    }));
  }, []);

  const walk = useCallback(() => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: true,
    }));
  }, []);

  const stop = useCallback(() => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
    }));
  }, []);

  const turnLeft = useCallback(() => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
      faceRight: true,
    }));
  }, []);

  const turnRight = useCallback(() => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
      faceRight: false,
    }));
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signin", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (stateWalk) {
      triggerStart(stateMachine.start);
      triggerWalk(stateMachine.walk);
      triggerFaceRight(stateMachine.faceRight);
    }
    if (stateWalkMobile) {
      triggerStartMobile(stateMachine.start);
      triggerWalkMobile(stateMachine.walk);
    }
  }, [
    stateMachine,
    stateWalk,
    stateWalkMobile,
    triggerStart,
    triggerWalk,
    triggerWalkMobile,
    triggerFaceRight,
    triggerStartMobile
  ]);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setFacingRight(true);
      if (!stateMachine.start) start();
      setTimeout(() => {
        stop();
        turnLeft();
      }, 2900);
    } else if (location.pathname === "/signin") {
      setFacingRight(false);
      if (!stateMachine.start) start();
      setTimeout(() => {
        stop();
        turnRight();
      }, 2900);
    }
  }, [location.pathname, stateMachine.start, start, stop, turnLeft, turnRight]);

  return (
    <div className="page-container">
      <div className="card-container">
        <div
          className={`${
            facingRight ? "slide-bottom" : "slide-top"
          } mobile-slider`}
        >
          <RiveComponentMobile
            style={{
              width: "20rem",
              height: "20rem",
            }}
          />
          <p className="title">Welcome to Our Platform</p>
          <p className="text">
            Create an account or sign in to access all features and join our community.
          </p>
        </div>
        <div className="one-piece">
          <div
            className={`${
              facingRight ? "ani-right" : "ani-left"
            } animation-container`}
          >
            <RiveComponent
              style={{
                width: "20rem",
                height: "20rem",
              }}
            />
          </div>
        </div>
        <div className={`${facingRight ? "slide-right" : "slide-left"} slider`}>
          <p className="title">Welcome to Our Platform</p>
          <p className="text">
            Create an account or sign in to access all features and join our community.
          </p>
        </div>
        <Signup
          setFacingRight={setFacingRight}
          animation={{
            turnRight,
            walk,
            start,
            stop,
            started: stateMachine.start,
            facingRight,
          }}
        />
        <Signin
          setFacingRight={setFacingRight}
          animation={{
            turnLeft,
            walk,
            start,
            stop,
            started: stateMachine.start,
            facingRight,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
