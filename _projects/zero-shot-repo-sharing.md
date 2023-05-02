---
layout: page
title: LongformPrompt - Extended GPT Prompts with Subdirectory Context
image: /assets/images/portfolio/item-9.png
description: A brief description of your project.
tags: ["Extra-Curricular", "Team Efforts"]
highlight: False
---

### Summary

When managing extensive code-based projects, supplying a GPT with enough context to generate insightful responses to specific questions can be challenging. The script presented here takes advantage of OpenAI API's 8,000 token context length (twice the chat interface's capacity) by extracting content from a specified folder directory and utilizing it as context for GPT-4, along with the user's query. This process enhances GPT's contextual comprehension and produces highly customized answers to user inquiries. This method has significantly expedited my progress and the application of newfound knowledge in other projects, such as the ongoing [Finite Element Analysis S&T Heat Exchanger]( {% link _projects/fea.md %} ).

<br>

### Background
In the context of Large Language Models (LLMs) like GPT-4, 'context length' refers to the maximum number of tokens (words or word pieces) that the model can process and consider simultaneously while generating a response or performing a task.

Context length is crucial for LLMs because it directly impacts the model's ability to understand and generate coherent and contextually relevant responses. A longer context length allows the model to better comprehend longer input texts and generate more accurate and coherent outputs.

By utilizing the doubled context length offered by the OAI API, I have successfully managed to pose more intricate requests to GPT-4 while preserving coherent communication.

<br>

### Script

<br>

```python
import os
import openai
from typing import Dict

openai.api_key = "redacted"
model_id = 'gpt-4'


def read_file_content(file_path: str) -> str:
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except UnicodeDecodeError:
        return None

def scan_directory_contents(repo_path: str) -> Dict[str, str]:
    file_contents = {}
    for root, _, files in os.walk(repo_path):
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.isfile(file_path):
                content = read_file_content(file_path)
                if content is not None:
                    file_contents[file_path] = content
    return file_contents

def list_files_and_folders(path, level=0):
    if not os.path.exists(path):
        print(f"The specified path '{path}' does not exist.")
        return

    prefix = "  " * level
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        if os.path.isfile(item_path):
            print(f"{prefix}- {item}")
        elif os.path.isdir(item_path):
            print(f"{prefix}+ {item}")
            list_files_and_folders(item_path, level + 1)


def process_file_contents(file_contents):
    # Your processing logic here
    preamble = "Please consider the following subdirectory structure and its associated file contents: {0}".format(file_contents)
    prompt = """
    
    
    This is a piece of a case study from openFOAM using the chtMultiRegionFoam solver to analyze a transient shell-and-tube heat exchanger system.
    Using your knowledge of openfoam and its various functions, please offer specific, justified, highly-actionable improvements to the code contents.
    Please make sure that your recommendations are specific to the contents presented here. We will discuss other aspects of the project later.


    
    """

    input = str(preamble) + str(prompt)
    response_container = openai.ChatCompletion.create(model=model_id, messages=[{'role': 'user', 'content': input}])
    response = response_container['choices'][0]['message']['content']
    print(response)
    return response

# ...


def dict_to_string(file_contents: Dict[str, str]) -> str:
    output = []
    for file_path, content in file_contents.items():
        output.append(f"File: {file_path}\nContent:\n{content}\n{'-' * 80}\n")
    return ''.join(output)

# ...

if __name__ == "__main__":
    repo_path = input("Please enter the repository path: ").strip()
    if os.path.isdir(repo_path):
        print("\nFolder structure:\n")
        list_files_and_folders(repo_path)
        
        result = scan_directory_contents(repo_path)

        # Convert the 'result' dictionary to a string
        result_str = dict_to_string(result)
        print("\nFile contents:")
        print(result_str)

        # Pass the 'result' dictionary to your custom function
        process_file_contents(result)

    else:
        print("Invalid directory path.")
```
<center><span style="font-size: 16px;">made in collaboration with GPT-4, of course</span></center>
<br>

### Example
I fed the directory containing my initial process conditions from my finite element analysis project to GPT-4 with the prompt shown in the code excerpt, and received the following output:

<br>

```
From the given code contents and the brief project description, it seems that you have set up the OpenFOAM case files for a transient shell-and-tube heat exchanger system using the "chtMultiRegionFoam" solver for conjugate heat transfer (CHT) simulation, containing separate fields for 'tube', 'shell', and 'solid' subdomains.

Looking at the provided code files, I have identified several areas where improvements can be made. I have listed my recommendations below:

1. In the "/home/jake/HXfromopenFOAM/shellAndTubeHeatExchanger/forGPT/0/tube/p" and "/home/jake/HXfromopenFOAM/shellAndTubeHeatExchanger/forGPT/0/shell/p" files, you use calculated boundary conditions for all boundaries. This may cause convergence issues if your case has a high aspect ratio between inlet/outlet and wall boundaries. To improve this, I recommend using fixedValue boundary conditions at the inlet and outlet boundaries based on the desired pressure drop across the heat exchanger. This will provide better stability for the pressure values and maintain the required pressure drop.

2. The turbulence models for both the shell and tube sides seem to be using the same default values. It would be better to tailor these turbulence parameters according to the specific flow properties (geometric, flow rate, fluid properties) of your heat exchanger domains. You can refer to some section-specific studies or available experimental/CFD data on shell-and-tube heat exchangers to find the appropriate values for turbulence properties.

3. In the "/home/jake/HXfromopenFOAM/shellAndTubeHeatExchanger/forGPT/0/tube/epsilon" and "/home/jake/HXfromopenFOAM/shellAndTubeHeatExchanger/forGPT/0/shell/epsilon" files, you are using the values of turbulence dissipation rate (epsilon) based on a fixed mixing length value. Since you are simulating a transient problem, it's possible that you may not have a constant mixing length. You should consider using variable mixing length based on the fluid/flow properties and the length scale of your domain.

4. In all the temperature files (T), you might want to consider adding a reference temperature or a specific heat capacity ratio depending on the fluid being used. This could improve the accuracy of the simulation in cases where the temperature difference across the exchanger is large or when temperature-dependent properties are used.

5. Instead of using hard-coded values for mass flow rate and integral length scale, you might consider including these parameters in a "transportProperties" file or similar file for easy modification and better organization.

Please note that these recommendations are based on the provided code files and the brief project description. Depending on other aspects of your setup and the specific goals of your study, additional improvements may be required.
```
<br>

Next, I provided the 'constant' subdirectory as context (this folder stores the properties and parameters that remain constant throughout the simulation. It includes information on the physical properties of materials used in the sim.) and received the following response:

<br>

```
1. Consistent and accurate directory structure: In the contents, we can see that there are files related to the shell, tube, and solid regions. However, for the 'tube' region, the file locations are within the "constant/shell" folder. To maintain consistency and avoid confusion, it's recommended to move the tube-related files to the "constant/tube" folder. For example, change the following lines in "tube/physicalProperties", "tube/momentumTransport", and "tube/g":

   
   location    "constant/shell";


   to


   location    "constant/tube";
   

2. Provide detailed comments: While certain comments are available in the files, it's recommended to add more detailed comments describing the choices made, specifically in the fluid properties and solver settings. For example, in the "shell/physicalProperties" and "tube/physicalProperties" files, explaining the choice of water as the fluid and the reasoning behind the specific properties assigned will make it easier to understand the case setup.

3. Utilize separate transport dictionaries for shell and tube regions: In the current contents, both the shell and tube regions use the same properties for fluid transport like mu and Pr. If the transport properties are different for both regions, it's better to create separate transport dictionaries and adjust the values accordingly.

4. Customize turbulence parameters for the tube region: The RAS settings in the "tube/momentumTransport" file are similar to the "shell/momentumTransport" file. Depending on the specific fluid flow and geometrical properties, the turbulence model and its parameters might be different for both regions. Ensure that the settings are specifically chosen for the tube region, and provide comments justifying the choices.

5. Verify pressure units for gravity: In the "shell/g" and "tube/g" files, the pressure units for gravity are given as [0 1 -2 0 0 0 0]. Check if these units are consistent with the case system of units (SI units or others). If needed, adjust the dimensions to conform to the consistent units' system.

While these improvements are primarily targeted at updating and organizing the case directories, it's essential to keep in mind the broader goal of achieving accurate and reliable simulation results. Always thoroughly validate the case settings, mesh quality, and initial conditions with the available literature and experimental data to ensure the model's reliability.

```

<br>

Likewise, with the 'system' subdirectory (this folder contains essential control files that dictate the simulation's settings, numerical schemes, and solvers.):

<br>

```
1. decomposeParDict: The current file specifies 8 subdomains for parallel processing, which will be beneficial for running the case on a multicore processor. However, depending on the actual number of cores available on your hardware, you may want to adjust the "numberOfSubdomains" parameter to match the number of available cores in order to optimize performance.

2. snappyHexMeshDict: In the current configuration, castellatedMesh and snap are turned off. If you want to use snappyHexMesh for generating a finer mesh around the heat exchanger and adapt it to the geometry, you should set the castellatedMesh and snap settings to "on".

3. snappyHexMeshDict: The current settings for refinements ('h' field) in the addLayersControls dictionary seem rather basic. You may want to consider adjusting the nSurfaceLayers parameter for each region (walls, shell_to_solid, tube_to_solid) to generate a better-resolved mesh near the boundaries that will improve the quality of the simulation, particularly if you expect any boundary layers or flow separation in the regions.

4. fvSolution (in system/shell/fvSolution and system/tube/fvSolution): In the current momentum solver settings, the preconditioner is set to DILU (diagonal incomplete LU decomposition). While this preconditioner may work well for certain cases, you could potentially achieve faster convergence by experimenting with other preconditioners, such as GAMG (Geometric Agglomerated Multigrid).

5. fvSchemes (in system/shell/fvSchemes and system/tube/fvSchemes): It seems that only upwind schemes are used for the convective terms. While these schemes are generally stable, they can introduce artificial diffusion that might affect the accuracy of the results. It might be beneficial to experiment with other higher-order accurate schemes, such as "linearUpwind", "Gauss vanLeer" or "limitedLinear" with an appropriate limiter for improving the solution's quality.

6. fvSchemes (in system/shell/fvSchemes and system/tube/fvSchemes): To improve the calculation of diffusion terms, you could try using Gauss linear uncorrected schemes instead of corrected schemes. This can sometimes lead to smoother results.

Overall, the presented case setup seems to provide a good starting point for analyzing a shell-and-tube heat exchanger system. However, you will likely want to experiment with different meshing, solver and discretization settings, as suggested above, in order to optimize the performance of the simulation and improve the accuracy of the results. Additionally, you should carefully test and validate your setup with appropriate benchmark cases to ensure that the selected settings provide meaningful and accurate results for your specific application.

```

<br>

These are mostly great, actionable insights! From organizational critiques to recommendations for improved turbulence modeling, I now have several directions I could go in optimizing my simulation. However, it should be noted that not all critiques here are valid, and each should be independently verified using reliable sources. But! This is a great starting point for my optimization process. Further, this script can be adapted to request step-by-step guides for resolving a given critique.

Beyond asking for feedback on my general approach to a project, I have used this method for building entire codeblocks / features into this site, which itself is a large repository with many interdependencies and moving parts, and most of the time it works on the first try. It's hard to overstate how helpful this has been.

<br>

### Significance
While GPT outputs are prone to hallucination and must be thoroughly audited, this framework provides a method for rapidly developing new insights on a project. Feel free to give it a try on your own projects! 

** Also, hopefully this goes without saying, but it is important not to share any proprietary information with an LLM. OpenAI does provide a way to [opt out of data collection](https://docs.google.com/forms/d/e/1FAIpQLScrnC-_A7JFs4LbIuzevQ_78hVERlNqqCPCt3d8XqnKOfdRdQ/viewform), but sensitive information should always stay in-house, lest we all be replaced by GPTs within the year ;)


<center><span style="font-size: 16px;"><<<<<<<<<<>>>>>>>>>></span></center>

<br>

If any of these projects seem relevant to a role you are looking to fill, please consider [reaching out](/contact) for a conversation, or feel free to browse my [other recent work](/portfolio).