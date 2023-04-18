---
layout: page
title: Finite Element Analysis S&T Heat Exchanger (ongoing)
image: /assets/images/portfolio/item-5.png
description: A brief description of your project.
tags: ["Process Simulation", "Extra-Curricular", "Team Efforts"]
highlight: True
---


{% raw %}
<video class="responsive-video-header" autoplay loop muted playsinline>
  <source src="/assets/videos/slicedviewHX200f30fps.webm" type="video/webm">
  <source src="/assets/videos/slicedviewHX200f30fps.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<center><span style="font-size: 20px;">transient 3D flow through shell-and-tube heat exchanger, built with openFOAM and ParaView</span></center>



<br>

### Summary

Finite Element Analysis (FEA) is a powerful computational method for simulating complex physical systems, such as heat exchangers (or ball valves), by dividing them into smaller elements. By solving time-dependent governing equations and applying boundary conditions, FEA can model transient conditions and provide insights into temperature profiles, pressure drop, heat transfer rates, and potential hotspots or areas of high stress. 

To that end, I have sourced a CAD file for a shell-and-tube heat exchanger, developed mesh representations for the exchanger's flow regions, and have simulated and visualized a steady-state flow condition for the exchanger. I am now experimenting with various transient CFD solvers within the openFOAM library to find one appropriate for this project.

My ultimate goal here is to develop a generalized workflow for converting CAD files and process constraints into high-fidelity models of transient process behaviors. 

As I make more progress, I will provide detailed updates and welcome any ideas for improving this strategy or generalizing it for wider applications in digital twin simulation technology.

### The Quick Take-Away
This project demonstrates my ability to tackle complex engineering challenges and optimize performance in critical systems. By modeling transient conditions and extracting valuable insights from complex simulation behaviors, this project highlights my proficiency in leveraging computational techniques to enhance the efficiency and reliability of process designs.

Optimizing heat exchangers and other fluid-mechanical systems plays a crucial role in reducing energy consumption, minimizing waste, and maximizing resource utilization. My experience with FEA allows me to contribute directly to these objectives by applying my skills to design, analyze, and optimize energy-efficient and sustainable solutions. Furthermore, my knowledge of digital twin simulation technology opens up opportunities for simulating and predicting the performance of systems in real-time, ensuring high-quality operational strategies.

### Objective

To accurately model transient process conditions within a shell-and-tube heat exchanger using FEA and only Free-and-Open-Source-Software (FOSS) tools. 

### Progress-to-date
So far, I have sourced an appropriate STL file for a shell-and-tube heat exchanger and performed necessary pre-processing steps to ensure accurate mesh dimensions:
<br> 

![HX Body](\assets\images\portfolio\HX\3d_exchanger_body.png){: .responsive-image}

<br>

 Further, I have developed the mesh representations for the exchanger, shown here:

<br>

![Hot Region](\assets\images\portfolio\HX\hot_region_mesh.png){: .responsive-image}

<br>

![Cold Region](\assets\images\portfolio\HX\full_mesh.png){: .responsive-image}
<br>
Before diving into transient flow modeling, I decided to check the viability of the meshes using a steady-state approach, with hot and cold water on the tube and shell-sides, respectively. Initial process parameters were as follows:

<br>

|                     | Hot Side       | Cold Side    |
| :----------:        | :-----------:  | :----------: |
| Inlet Temperature   | 383 K          | 283 K        |
| Fluid Velocity      | 0.02 m/s       | 0.01 m/s     |

<br>

Using SimFlow to experiment with steady-state conditions, and ParaView for data visualization, I got the following results:

<br>

![Residuals](\assets\images\portfolio\HX\residuals.png){: .responsive-image}

<br>

Where residuals refer to the difference between the calculated value of a variable and its expected value based on its governing equations. Commonly used threshold values are in the range of 1e-4 to 1e-6. These values can be adjusted depending on the desired level of accuracy and the computational resources available, but for this idealized experimental application, these values are acceptable.

<br>

![Velocity](\assets\images\portfolio\HX\velocity.png){: .responsive-image}

<br>

Where 'U' represents fluid velocity, and points are colored based on fluid velocity profile. Looks good!

Unfortunately, the SimFlow output files seem to have a compilation error that makes the temperature data unreadable, so I will be troubleshooting that next.

*minor update here: because openFOAM is designed for Linux systems, I think the temperature data I generated on my Windows machine was corrupted due to compatibility issues. I have created an ubuntu partition on my machine that is more compatible with openFOAM outputs, and have had better results (see below). If I have time, I will regenerate these results on Ubuntu to get accurate temperature data.


### Transient Flow Case

Because openFOAM comes with several tutorials for using its various solvers, I have decided to work with those and adapt them to suit the heat exchanger problem, rather than building the repository from scratch. Right now, I am experimenting with the pisoFoam solver, which uses the PISO (Pressure-Implicit with Splitting of Operators) algorithm to decouple the pressure and velocity fields in the momentum equation, allowing for an efficient and stable solution of the incompressible Navier-Stokes equations. Additionally, pisoFoam can handle turbulence modeling by incorporating various turbulence models, such as k-epsilon, k-omega, or large-eddy simulation (LES), to account for the effects of turbulence on the fluid flow. The pisoFoam solver source code contains an example repo that models a ball valve system that consists of a pipe with a ball valve in the middle, which regulates the flow of fluid through the pipe. This example showcases a FEA solution of the incompressible Navier-Stokes equations for transient conditions in three dimensions. After running this simulation, I was able to develop the following animation using ParaView:

<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/ballvalve10fps.webm" type="video/webm">
  <source src="/assets/videos/ballvalve10fps.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>
<br>
**and again, doubling the inlet pressure:**
<br>
<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/ballvalve20pa10fps.mp4" type="video/mp4">
  <source src="/assets/videos/ballvalve20pa10fps.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>

Note that the pisoFoam solver in the OpenFOAM library does not directly incorporate temperature values into its solutions, which may affect the modeling of buoyant forces. However, there are other solvers available within the OpenFOAM library that can handle temperature effects on flow, using pisoFoam's outputs as inputs. It's important to note that the results of this workflow might not fully capture the influence of buoyant forces in a given flow regime if the buoyancy term is not included in the Navier-Stokes equations. To account for buoyant forces, users should consider solvers that incorporate the buoyancy term, such as buoyantPisoFoam, which extends the pisoFoam solver to handle buoyancy-driven flows.

After some thought, I've decided it's likely not appropriate to apply the PisoFoam solver to modeling a heat exchanger, so I will be further researching bouyantPisoFoam other openFOAM solvers with relevant examples that will better model the parameters pertinent to heat exchanger design.

However, these simulation results confirm that I can locally simulate transient flow in three dimensions, and can easily adjust the base openFOAM examples to suit other applications.

### chtMultiRegionFoam Experimentation Update

My research on openFOAM solvers has converged on the chtMultiRegionFoam solver, which is specifically designed to model conjugate heat transfer (CHT) in systems involving multiple regions with different materials and fluid-solid interfaces. Further, this solver is designed for incompressible (or compressible, to a degree), turbulent or laminar, and transient or steady state simulations, all of which encapsulate the majority of heat exchange systems.

As luck would have it, this solver has a shell-and-tube simulation case study hidden in its source code. I have staged and run that simulation, and developed the following animation:

<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/slicedviewHX200f30fps.webm" type="video/webm">
  <source src="/assets/videos/slicedviewHX200f30fps.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>

Where the boundary conditions set for the simulation are as follows:

<br>

| Region | Field   | Boundary       | Type                                                | Description                                      |
|--------|---------|----------------|-----------------------------------------------------|--------------------------------------------------|
| Shell  | alphat  | .*             | calculated                                          | Values calculated by the solver                  |
|        | epsilon | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | turbulentMixingLengthDissipationRateInlet          | Dissipation rate at the inlet with specified mixing length |
|        |         | wall           | epsilonWallFunction                                 | Wall function for turbulent dissipation rate     |
|        | k       | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | turbulentIntensityKineticEnergyInlet                | Kinetic energy at the inlet with specified turbulence intensity |
|        |         | wall           | kqRWallFunction                                     | Wall function for turbulent kinetic energy       |
|        | nut     | lower          | calculated                                          | Values calculated by the solver                  |
|        |         | upper          | calculated                                          | Values calculated by the solver                  |
|        |         | wall           | nutkWallFunction                                    | Wall function for turbulent kinematic viscosity  |
|        | p       | .*             | calculated                                          | Values calculated by the solver                  |
|        | p_rgh   | lower          | fixedValue                                          | Fixed value boundary condition                   |
|        |         | upper          | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        |         | wall           | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        | T       | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | fixedValue                                          | Fixed value boundary condition                   |
|        |         | walls          | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | shell_to_solid | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between shell and solid  |
|        | U       | lower          | pressureInletOutletVelocity                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | flowRateInletVelocity                               | Mass flow rate for the inlet                     |
|        |         | wall           | noSlip                                              | Zero velocity at the boundary (no-slip)          |


<br>

| Region | Field   | Boundary         | Type                                                | Description                                      |
|--------|---------|------------------|-----------------------------------------------------|--------------------------------------------------|
| Solid  | T       | external         | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | solid_to_shell   | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between solid and shell |
|        |         | solid_to_tube    | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between solid and tube  |
|--------|---------|------------------|-----------------------------------------------------|--------------------------------------------------|
| Tube   | alphat  | .*               | calculated                                          | Values calculated by the solver                  |
|        | epsilon | lower            | turbulentMixingLengthDissipationRateInlet          | Dissipation rate at the inlet with specified mixing length |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | epsilonWallFunction                                 | Wall function for turbulent dissipation rate     |
|        | k       | lower            | turbulentIntensityKineticEnergyInlet                | Kinetic energy at the inlet with specified turbulence intensity |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | kqRWallFunction                                     | Wall function for turbulent kinetic energy       |
|        | nut     | lower            | calculated                                          | Values calculated by the solver                  |
|        |         | upper            | calculated                                          | Values calculated by the solver                  |
|        |         | wall             | nutkWallFunction                                    | Wall function for turbulent kinematic viscosity  |
|        | p       | .*               | calculated                                          | Values calculated by the solver                  |
|        | p_rgh   | lower            | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        |         | upper            | fixedValue                                          | Fixed value boundary condition                   |
|        |         | wall             | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        | T       | lower            | fixedValue                                          | Fixed value boundary condition                   |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | walls            | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | tube_to_solid    | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between tube and solid  |
|        | U       | lower            | flowRateInletVelocity                               | Mass flow rate for the inlet                     |
|        |         | upper            | pressureInletOutletVelocity                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | noSlip                                              | Zero velocity at the boundary (no-slip)          |


<br>

To be sure that I can adapt this to future use-cases, I will be attempting to create a chtMultiRegionFoam sim of our earlier HX case study by modifying this case-study. This may or may not work, given that the HX has zero-width walls and tubes, and must be modeled as thermal resistance values, but I think it is worth a shot. Stay tuned!

I will provide detailed updates as I make more progress. If you have any ideas for improving this strategy, please reach out! I would love to collaborate on this and ideas for generalizing this procedure as digital twin simulation tech becomes more accessible.




<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact), or feel free to browse my [other recent projects](/portfolio).