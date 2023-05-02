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

<center><span style="font-size: 20px;">transient 3D heat transfer through shell-and-tube heat exchanger, built with openFOAM and ParaView</span></center>



<br>

### Summary

Finite Element Analysis (FEA) is a powerful computational method for simulating complex physical systems, such as heat exchangers, by dividing them into smaller elements. By solving time-dependent governing equations and applying boundary conditions, FEA can model transient conditions and provide insights into temperature profiles, pressure drops, heat transfer rates, and potential hotspots or areas of high stress.

In this project, I aim to create a generalized workflow for converting CAD files and process constraints into high-fidelity models of transient process behaviors. I will use these models to develop and leverage rigorous design insights.

To achieve this, I have simulated and visualized steady-state flow conditions within a hypothetical heat exchanger and experimented with various fluid dynamics solvers within the openFOAM library, ultimately selecting the chtMultiRegionFoam solver for this project.  Furthermore, I have successfully set up and simulated a case study involving a heat exchanger found in the openFOAM source code (animation displayed above; further details below). I am currently optimizing the case study setup and plan to submit my improvements to openFOAM upon completion.

As I continue to make progress, I will provide detailed updates and welcome any ideas for improving this strategy or generalizing it for wider applications in digital twin simulation technology.

### The Quick Take-Away
This project demonstrates my ability to tackle complex engineering challenges and optimize performance in critical systems. By modeling transient conditions and extracting valuable insights from complex simulation behaviors, this project highlights my proficiency in leveraging computational techniques to enhance the efficiency and reliability of process designs.

Optimizing heat exchangers and other fluid-mechanical systems plays a crucial role in reducing energy consumption, minimizing waste, and maximizing resource utilization. My experience with FEA allows me to contribute directly to these objectives by applying my skills to design, analyze, and optimize energy-efficient and sustainable solutions. Furthermore, my knowledge of digital twin simulation technology opens up opportunities for simulating and predicting the performance of systems in real-time, ensuring high-quality operational strategies.

### Objective

To accurately model transient process conditions within a shell-and-tube heat exchanger using FEA and only Free-and-Open-Source-Software (FOSS) tools, and to rigorously evaluate the simulation results.

### Steady-State Approach
I have sourced an appropriate STL file for a shell-and-tube heat exchanger and developed the mesh representations for the exchanger's hot and cold fluid regions.

To validate the meshes, I used a steady-state approach with hot and cold water on the tube and shell-sides, respectively. Using SimFlow for steady-state condition experimentation and ParaView for data visualization, I obtained the following results:

<br>

![Residuals](\assets\images\portfolio\HX\residuals.png){: .responsive-image}

<br>

Residuals represent the difference between calculated and expected values based on governing equations. Acceptable thresholds are typically in the range of 1e-4 to 1e-6, which is sufficient for this idealized experimental application.

<br>

![Velocity](\assets\images\portfolio\HX\velocity.png){: .responsive-image}

<br>

Points are colored based on fluid velocity profiles, with 'U' representing fluid velocity. Note the areas of low velocity around the baffles and the lack of mesh leakage. So far so good!

However, the SimFlow output files had a compilation error, making the temperature data unreadable. I will troubleshoot this issue next.

*Update: I suspect the temperature data corruption is due to compatibility issues between openFOAM and my Windows machine, as openFOAM is designed for Linux systems. After creating an Ubuntu partition for better compatibility, I have had better results with other simulations. I will regenerate these results on Ubuntu to obtain accurate temperature data if time permits.


### Transient Flow Approach

OpenFOAM is an open-source, versatile software package for computational fluid dynamics (CFD) simulations, widely used in various industries to model and analyze complex fluid flow and heat transfer phenomena. To adapt existing openFOAM tutorials for the heat exchanger problem, I experimented with the pimpleFoam solver, which utilizes the PIMPLE (Pressure-Implicit with Interleaved Linking of Equation) algorithm, which is an extension of the PISO (Pressure-Implicit with Splitting of Operators) method. This algorithm allows for the efficient and stable solution of incompressible Navier-Stokes equations by combining the benefits of both SIMPLE (Semi-Implicit Method for Pressure-Linked Equations) and PISO methods. It enables the simulation of both steady-state and transient cases by iterating between pressure and velocity fields in the momentum equation. PimpleFoam can also handle turbulence modeling by incorporating various models, such as k-epsilon, k-omega, or large-eddy simulation (LES).

The pimpleFoam solver source code includes an example of a system with a pipe and a ball valve, demonstrating a 3D FEA solution of the incompressible Navier-Stokes equations for transient conditions. I created an animation using ParaView to visualize the simulation results:

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
Then, to verify that I can alter base openFOAM case-studies, I doubled the inlet pressure, refined the mesh along each dimension, did some CPU optimization (8-core -> 12-core processing), and re-ran the simulation:
<br>
<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/10fps120frameballvalvehighlyrefined.mp4" type="video/mp4">
  <source src="/assets/videos/10fps120frameballvalvehighlyrefined.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>

However, the pimpleFoam solver does not directly incorporate temperature values into its solutions, which may affect the modeling of buoyant forces. While there are solvers in the openFOAM library that can handle temperature effects on flow using pimpleFoam's outputs, the results might not fully capture the influence of buoyant forces if the buoyancy term is not included in the Navier-Stokes equations. To account for buoyant forces, one might consider solvers like buoyantPisoFoam, which extends pimpleFoam to handle buoyancy-driven flows.

After further consideration, I concluded that pimpleFoam is not suitable for modeling a heat exchanger. Instead, I researched other openFOAM solvers with relevant examples that better model heat exchanger design parameters (see below).

On the bright side, these simulation results confirm my ability to locally simulate transient flow in three dimensions and adapt base openFOAM examples for other applications.

<h3 id="chtmulti-region-experiment">chtMultiRegionFoam Experimentation Update</h3>

My research on openFOAM solvers has led me to the chtMultiRegionFoam solver, specifically designed for modeling conjugate heat transfer (CHT) in systems involving multiple regions with different materials and fluid-solid interfaces. This solver is suitable for incompressible (or somewhat compressible), turbulent or laminar, single-phase, and transient or steady-state simulations, which cover the majority of heat exchange systems.

As luck would have it, this solver has a shell-and-tube heat exchanger simulation case study hidden in its source code (I swear you can't find this using google/chatGPT/Bing or in the openFOAM documentation). I have staged and run that simulation, and developed the following animation:

<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/lq8fps160frames.webm" type="video/webm">
  <source src="/assets/videos/lq8fps160frames.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>

and the process conditions for the **counter-current** exchanger are as follows:

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

**For details about the base-case boundary conditions set in the source code, [see here]({{ site.baseurl }}{% post_url 2023-04-24-boundary-conditions-hx-openFOAM %}).**

Because this is a more realistic model and simulation setup than the original from my project statement, which has zero-thickness walls, and is simply modeled as a series of thermal resistance values, I will continue working with the openFOAM case-study to better understand its assumptions and to challenge its accuracy as rigorously as I can (without experimental data). For starters, those viscosity values look weird...


<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

After reviewing the source code, my first pass of revisions include the following changes:


| Change Log for HX sim | 
| --- | 
| 1. Shell side fluid is water at 600K, well above the boiling point of water --> change water temp to 370K. Removes need for 10 MPa pressure condition. |
| 2. Changed write interval for data from 1 / sec to 30 / sec, improving animation framerate. |
| 3. Changed tube-side water flowrate from 0.05 kg/s to 0.5 kg/s for a velocity of 0.75 m/s. |
| 4. Changed shell-side water flowrate from 0.05 kg/s to 0.275 kg/s for a velocity of 0.05 m/s. |
| 5. Decoupled fluid thermophysical parameters for separate fluid regions, allowing for distinct Prandtle / Mu values for shell- and tube-side fluids. |
| 6. Changed dynamic viscosity of shell-side water from 959e-6 to 294e-6 (370 K). |
| 7. Changed dynamic viscosity of tube-side water from 959e-6 to 850e-5 (300 K). |
| 8. Changed Prandtl number of shell-side water from 6.62 to 1.74, based on new dynamic viscosity and thermal diffusivity of water at 370 K is 0.167x10-6 m2/s (assuming atmospheric pressure). |
| 9. Changed Prandtl number for tube-side water from 6.62 to 5.94. |

<br>

Leading to the following results:

<br>

{% raw %}
<video class="responsive-video" autoplay loop muted playsinline>
  <source src="/assets/videos/finalfinalfinal.webm" type="video/webm">
  <source src="/assets/videos/finalfinalfinal.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{% endraw %}

<br>


While not as visually striking as our original animation, due to the dramatically decreased &#x0394;T values and increased flowrates, this simulation is now more in-line with realistic process operations. Next, I will validate the simulation results with conventional HX design correlations and then do a second pass of revisions, based on critiques outlined in my [LongForm GPT Prompting]( {% link _projects/zero-shot-repo-sharing.md %} ) project.

A final round revision will include mesh refinement, time-step minimization, and other computationally-expensive optimizations; putting this off now allows for more rapid iteration while conducting other "compute-independent" optimizations.

<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

I will provide detailed updates as I make more progress. If you have any ideas for improving this strategy, please reach out! I would love to collaborate on this and ideas for generalizing this procedure as digital twin simulation tech becomes more accessible.




<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact), or feel free to browse my [other recent projects](/portfolio).