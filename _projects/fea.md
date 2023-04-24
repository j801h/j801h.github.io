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
  <source src="/assets/videos/lq8fps160frames.webm" type="video/webm">
  <source src="/assets/videos/lq8fps160frames.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<center><span style="font-size: 20px;">transient 3D flow through shell-and-tube heat exchanger, built with openFOAM and ParaView</span></center>



<br>

### Summary

Finite Element Analysis (FEA) is a powerful computational method for simulating complex physical systems, such as heat exchangers, by dividing them into smaller elements. By solving time-dependent governing equations and applying boundary conditions, FEA can model transient conditions and provide insights into temperature profiles, pressure drops, heat transfer rates, and potential hotspots or areas of high stress.

In this project, I aim to create a generalized workflow for converting CAD files and process constraints into high-fidelity models of transient process behaviors. I will use these models to develop and leverage rigorous design insights.

To achieve this, I have sourced a CAD file for a shell-and-tube heat exchanger and developed mesh representations for the exchanger's flow regions. I have simulated and visualized steady-state flow conditions and experimented with various fluid dynamics solvers within the openFOAM library, ultimately selecting the chtMultiRegionFoam solver for this project. Additionally, I have successfully staged and simulated a case study for a heat exchanger found in the openFOAM source code (animation shown above; details below).

As I continue to make progress, I will provide detailed updates and welcome any ideas for improving this strategy or generalizing it for wider applications in digital twin simulation technology.

### The Quick Take-Away
This project demonstrates my ability to tackle complex engineering challenges and optimize performance in critical systems. By modeling transient conditions and extracting valuable insights from complex simulation behaviors, this project highlights my proficiency in leveraging computational techniques to enhance the efficiency and reliability of process designs.

Optimizing heat exchangers and other fluid-mechanical systems plays a crucial role in reducing energy consumption, minimizing waste, and maximizing resource utilization. My experience with FEA allows me to contribute directly to these objectives by applying my skills to design, analyze, and optimize energy-efficient and sustainable solutions. Furthermore, my knowledge of digital twin simulation technology opens up opportunities for simulating and predicting the performance of systems in real-time, ensuring high-quality operational strategies.

### Objective

To accurately model transient process conditions within a shell-and-tube heat exchanger using FEA and only Free-and-Open-Source-Software (FOSS) tools, and to rigorously evaluate the simulation results.

### Progress-to-date
I have sourced an appropriate STL file for a shell-and-tube heat exchanger and performed necessary pre-processing steps to ensure accurate mesh dimensions:
<br> 

![HX Body](\assets\images\portfolio\HX\3d_exchanger_body.png){: .responsive-image}

<br>

 I have also developed the mesh representations for the exchanger's hot and cold fluid regions, shown here:

<br>

![Hot Region](\assets\images\portfolio\HX\hot_region_mesh.png){: .responsive-image}

<br>

![Cold Region](\assets\images\portfolio\HX\full_mesh.png){: .responsive-image}

<br>

To validate the meshes, I used a steady-state approach with hot and cold water on the tube and shell-sides, respectively, and the following initial process parameters:

<br>

|                     | Hot Side       | Cold Side    |
| :----------:        | :-----------:  | :----------: |
| Inlet Temperature   | 383 K          | 283 K        |
| Fluid Velocity      | 0.02 m/s       | 0.01 m/s     |

<br>

Using SimFlow for steady-state condition experimentation and ParaView for data visualization, I obtained the following results:

<br>

![Residuals](\assets\images\portfolio\HX\residuals.png){: .responsive-image}

<br>

Residuals represent the difference between calculated and expected values based on governing equations. Acceptable thresholds are typically in the range of 1e-4 to 1e-6, which is sufficient for this idealized experimental application.

<br>

![Velocity](\assets\images\portfolio\HX\velocity.png){: .responsive-image}

<br>

Points are colored based on fluid velocity profiles, with 'U' representing fluid velocity.

However, the SimFlow output files had a compilation error, making the temperature data unreadable. I will troubleshoot this issue next.

*Update: I suspect the temperature data corruption is due to compatibility issues between openFOAM and my Windows machine, as openFOAM is designed for Linux systems. After creating an Ubuntu partition for better compatibility, I have had better results with other simulations. I will regenerate these results on Ubuntu to obtain accurate temperature data if time permits.


### Transient Flow Case

To adapt existing openFOAM tutorials for the heat exchanger problem, I experimented with the pisoFoam solver, which uses the PISO (Pressure-Implicit with Splitting of Operators) algorithm to decouple pressure and velocity fields in the momentum equation. This allows for efficient and stable solutions of the incompressible Navier-Stokes equations. PisoFoam can also handle turbulence modeling by incorporating various models, such as k-epsilon, k-omega, or large-eddy simulation (LES).

The pisoFoam solver source code includes an example of a system with a pipe and a ball valve, demonstrating a 3D FEA solution of the incompressible Navier-Stokes equations for transient conditions. I created animations using ParaView to visualize the simulation results:

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
**To verify that I can alter base openFOAM case-studies, I changed the inlet pressure, refined the mesh long the length of the pipe, and re-ran the simulation:**
<br>
<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/10fps120framesslicedvalvefinemesh.mp4" type="video/mp4">
  <source src="/assets/videos/10fps120framesslicedvalvefinemesh.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>

However, the pisoFoam solver does not directly incorporate temperature values into its solutions, which may affect the modeling of buoyant forces. While there are solvers in the openFOAM library that can handle temperature effects on flow using pisoFoam's outputs, the results might not fully capture the influence of buoyant forces if the buoyancy term is not included in the Navier-Stokes equations. To account for buoyant forces, one might consider solvers like buoyantPisoFoam, which extends pisoFoam to handle buoyancy-driven flows.

After further consideration, I concluded that pisoFoam is not suitable for modeling a heat exchanger. Instead, I researched other openFOAM solvers with relevant examples that better model heat exchanger design parameters (see below).

On the bright side, these simulation results confirm my ability to locally simulate transient flow in three dimensions and adapt base openFOAM examples for other applications.

### chtMultiRegionFoam Experimentation Update

My research on openFOAM solvers has led me to the chtMultiRegionFoam solver, specifically designed for modeling conjugate heat transfer (CHT) in systems involving multiple regions with different materials and fluid-solid interfaces. This solver is suitable for incompressible (or somewhat compressible), turbulent or laminar, single-phase, and transient or steady-state simulations, which cover the majority of heat exchange systems.

As luck would have it, this solver has a shell-and-tube simulation case study hidden in its source code (I swear you can't find this using google/chatGPT/Bing or in the openFOAM documentation). I have staged and run that simulation, and developed the following animation:

<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/lq8fps160frames.webm" type="video/webm">
  <source src="/assets/videos/lq8fps160frames.mp4" type="video/mp4">
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

<center><span style="font-size: 16px;">**Please refer to the openFOAM documentation or source code for more details on boundary condition functions**</span></center>

<br>

and the process conditions for the co-current exchanger are as follows:

<br>

| Property          | Shell-side fluid: Water | Heat exchanger material: Aluminum | Tube-side fluid: Water |
|-------------------|-------------------------|-----------------------------------|------------------------|
| Molecular weight  | 18                      | 27                                | 18                     |
| Density (rho)     | 1000 kg/m³              | 2700 kg/m³                        | 1000 kg/m³             |
| Specific heat     | Cp: 4181 J/(kg·K)       | Cv: 900 J/(kg·K)                  | Cp: 4181 J/(kg·K)      |
| Reference enthalpy| 0 J/mol                 | 0 J/mol                           | 0 J/mol                |
| Dynamic viscosity | 959e-6 kg/(m·s)         | N/A                               | 959e-6 kg/(m·s)        |
| Prandtl number    | 6.62                    | N/A                               | 6.62                   |
| Thermal conductivity | N/A                   | 200 W/(m·K)                       | N/A                    |
| Initial temperature| 600 K                   | N/A                               | 300 K                  |
| Mass flow rate    | 0.05 kg/s               | N/A                               | 0.05 kg/s              |


<br>

Because this is a more realistic model and simulation than the original from my project statement, which has zero-thickness walls, and is simply modeled as a series of thermal resistance values, I will continue working with the openFOAM case-study to better understand its assumptions and to challenge its accuracy as rigorously as I can (without experimental data). For starters, those viscosity values look weird...


<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

I will provide detailed updates as I make more progress. If you have any ideas for improving this strategy, please reach out! I would love to collaborate on this and ideas for generalizing this procedure as digital twin simulation tech becomes more accessible.




<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact), or feel free to browse my [other recent projects](/portfolio).