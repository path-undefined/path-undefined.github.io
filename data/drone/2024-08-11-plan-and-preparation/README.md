<sup>[Thumbnail image by freepik](https://www.freepik.com/free-photo/close-up-still-life-hard-exams_23668649.htm#fromView=search&page=1&position=34&uuid=3c7c1d74-36c3-4dcf-8835-3a9f970ce452)</sup>

I always wanted to have a drone, because it allows me to see the world from a very different angle. But instead of buying one, I decided to do it the hard way. I will build it, from scratch, not using any programed flight controller. It might sound like a crazy plan, but actually I already know most of the theories. So why shouldn't I just put my understanding about those theories into practice?

The plan is to make a platform to bring a tiny camera like GoPro into the air, and make the control deadly simple, so that I can control the drone with my dumb fingers without crashing it into a tree or wall or even myself.

The drone should have 4 motors and it should be mid-sized, for the stability as a shooting platform, also portability for travel, and it should be controlled using a gamepad, with:
* one stick controlling the forward, backward, left and right movement,
* another stick controlling the yaw of the drone, and the pitch of the camera,
* 2 buttons (e.g. the 2 trigger buttons) controlling the altitude of the drone, and
* maybe an extra button to activate the landing mode, to ensure a smooth automatic landing process.

To achieve the control, the drone should have following sensors:
* GPS – to know the speed, position and altitude of the drone;
* Barometer – another measurement of the altitude;
* Gyroscope – to know the yaw, pitch and roll of the drone;
* Accelerometer – another measurement of the yaw, pitch and roll, but also measures the linear acceleration;
* Lidar (maybe) – only if I want to implement the automatic landing process. It will measure the distance between the drone and the ground accurately.

As effectors, the following parts are needed:
* 4 motors + 4 motor drivers (maybe there is a 4 in 1 motor driver?) + 4 propellers
* 1 servo to control the pitch of the camera

As the brain of the drones, my gut feeling is I need a chip with high performance, for more features in the future. And I also need a simple chip like arduino to ensure the real time control:
* Raspberry Pi 4 (maybe): as the brain of the drone
* Arduino Mini (maybe): as the spinal cord of the drone

For the communication between the drone and the human:
* FPV Camera
* VTX module for FPV drone and the receiver
* Radio control module and receiver

I shouldn't forget about frames and batteries:
* X-shaped carbon-fiber drone frame;
* Li-Ion battery;
* Small GoPro mount, which can hold GoPro **AND** the FPV camera, and can be attached to a servo.

I have to admit, that's quite a lot of things to buy. But fortunately, most of the parts are not very expensive, and I don't have to buy them all together, I just need to buy the parts where I'll be working on. That's reducing the one-off financial stress.

But before I spend money on any of them, I know there is something which is much more important than the hardware – the drone control software. But instead of putting the software directly in use and learning from crashing, I'd better do some physical simulations first.

Since the final product will run on Raspberry Pi, I would use Python to implement the controlling program. But I would use some Web Technology to build the visualization part, maybe Three.js. And to put them together, it would be: the controlling program should be written in Python, wrapped with Flask to provide the web service, and use Three.js and Vue in the frontend to visualize the simulation.

Beside that, it is also very important to get related projects as a reference. The one that I liked the most is a YouTube channel called [Carbon Aeronautics](https://www.youtube.com/@carbonaeronautics). The YouTuber has done basically everything that I wanted to do. With this channel, I even have more confidence to do this on my own. Let's see how it goes.
