---
layout: page
title: Building a Database of Historical Procurement Data
image: /assets/images/portfolio/item-8.png
description: A brief description of your project.
tags: ["Extra-Curricular", "Team Efforts"]
highlight: True
---
### Summary
I developed a Python script that utilized NLP techniques, specifically fuzzy matching, to navigate my previous firm's siloed network architecture and accumulate historical procurement data across 30 years of projects. This resulted in the creation of a comprehensive database containing over 250,000 line items, which improved decision-making, efficiency, collaboration, knowledge retention, and cost optimization. 

### The Speed-Reader's 'So-What'
The significance of this project goes beyond its immediate impact on my previous firm, as it has enhanced decision-making, efficiency, collaboration, knowledge retention, and cost optimization. By utilizing NLP techniques and dismantling data barriers, I have demonstrated my capacity to adapt, innovate, and refine processes, all crucial for fostering enduring, eco-friendly solutions.

My experience with data-driven decision-making and effective resource management is essential for minimizing waste and avoiding duplication of efforts. The skills I honed during this project are directly applicable to these goals.

Furthermore, this project highlights my proactive approach to problem-solving and my commitment to continuous learning. In a fast-paced and ever-evolving industry, these qualities are invaluable as they enable professionals to stay ahead of the curve and identify new opportunities for innovation.

### Challenges of Data Accessibility

Organizations often face significant challenges when their previous project data is inaccessible, which can negatively impact decision-making, productivity, and competitiveness. Key obstacles include:

- Loss of institutional knowledge: Inaccessible data can lead to loss of valuable insights and experiences, hindering future progress and innovation.

- Hindered decision-making: Limited access to historical data can impede informed decision-making, making it difficult to predict outcomes or draw comparisons.

- Reduced efficiency: The inability to reference or reuse previous work can lead to duplicate efforts and wasted resources.

### Natural Language Processing as a Solution

Natural Language Processing (NLP) has the potential to significantly mitigate the issues caused by inaccessible data within organizations by enabling more efficient and effective access to internal network resources. Here are several ways NLP can help:

- Improved search and retrieval: NLP can enhance search functionality by understanding the context and semantics of user queries, making it easier to locate relevant documents, emails, or other resources within the internal network.

- Automatic categorization and tagging: NLP can automatically categorize and tag internal documents, facilitating better organization and making it easier for employees to find the information they need.

- Knowledge extraction and summarization: NLP can extract key information from large volumes of data, distilling it into concise summaries, which can aid in decision-making and problem-solving.

- Enhanced collaboration: NLP can facilitate cross-functional collaboration by helping employees locate relevant colleagues and their work, fostering knowledge sharing and reducing duplication of efforts.

- Trend and pattern recognition: NLP can analyze historical data to identify patterns and trends, providing valuable insights that can inform future strategies and initiatives.

By implementing NLP solutions for internal network resources, organizations can unlock the full potential of their historical data, enhancing decision-making, collaboration, and overall competitiveness.

### Building a Bespoke Database Using NLP

At my previous firm, data was heavily siloed due to a network architecture that was devised prior to the explosion of capabilities of NLP tools. Consequently, previous work was challenging to search, and prior knowledge was primarily shared through word-of-mouth requests to more experienced colleagues.

A friend of mine who worked at Facebook at the time introduced me to NLP in the form of sentiment analysis and 'nearest-neighbor' comparisons using Levenshtein distance, which is an algorithm for calculating the minimum 'edit distance' between two strings of characters. To me, this represented a shift in how certain tasks could be automated; previously, it was necessary to explicitly outline each permutation of actions needed for performing a given task, or else errors and unintended behaviors would accumulate, whereas now it seemed that one could set a tolerance for handling outliers in a given dataset.

This insight allowed me to develop a python script that could navigate the firm's network architecture, searching for subtle variations of resource templates across 30 years of projects and to accumulate data points *most-likely* to be relevant historical procurement data.

Unfortunately, due to security reasons, I cannot share the script. However, the following python pseudocode can provide a general outline of its functionality:


```python
import os
import glob
import pandas as pd
from fuzzywuzzy import fuzz, process

# Define the base path and file format for the project folders
base_path = "/path/to/project/folders"
procurement_file_keyword = "procurement"

# Define the expected column names and their approximate versions
expected_column_names = {
    'new_column_name': ['old_column_name', 'column_name', 'previous_column_name']
}

# Define the expected sheet name in the Excel workbook
expected_sheet_name = "Sheet1"

# Initialize an empty DataFrame to store the data
all_data = pd.DataFrame()

# Loop through the project numbers
for project_number in range(1000, 9001):
    # Construct the folder path
    folder_path = os.path.join(base_path, f"Project{project_number}")

    # Check if the folder exists, if not, continue to the next project number
    if not os.path.exists(folder_path):
        continue

    # Use glob to find all files in the folder
    all_files = glob.glob(os.path.join(folder_path, "*"))

    # Use fuzzy matching to find the closest match to the procurement file keyword
    closest_match, match_score = process.extractOne(procurement_file_keyword, all_files)

    # If the match score is above a certain threshold, consider it as the procurement file
    if match_score > 80:
        procurement_file = closest_match
    else:
        continue

    # Read the excel file using pandas
    xls = pd.ExcelFile(procurement_file)

    # Use fuzzy matching to find the closest match to the expected sheet name
    closest_match, match_score = process.extractOne(expected_sheet_name, xls.sheet_names)

    # If the match score is above a certain threshold, consider it as the data sheet
    if match_score > 90:
        sheet_name = closest_match
    else:
        continue

    # Load the data from the appropriate sheet
    df = pd.read_excel(xls, sheet_name)

    # Perform necessary data cleaning and preprocessing
    for new_column_name, old_column_names in expected_column_names.items():
        # Use fuzzy matching to find the closest match to the expected column name
        closest_match, match_score = process.extractOne(new_column_name, df.columns)

        # If the match score is above a certain threshold, rename the column
        if match_score > 90:
            df.rename(columns={closest_match: new_column_name}, inplace=True)

    # Concatenate the cleaned DataFrame to the main DataFrame
    all_data = pd.concat([all_data, df], ignore_index=True)

# (Optional) Save the resulting DataFrame to a new file
all_data.to_csv("all_procurement_data.csv", index=False)


```
### Outcomes

This simple concept was used to accumulate 250,000+ line items for equipment procured and services provided over the firm's lifespan. Some advantages:

- Enhanced decision-making: Access to a comprehensive database of procurement data enables better-informed decisions, as employees can now analyze past trends, supplier performance, and pricing patterns to optimize procurement strategies.

- Increased efficiency: Centralizing procurement data eliminates redundant efforts and wasted resources, as employees no longer need to search multiple data silos to find relevant information. This streamlines workflows and saves time.

- Improved collaboration: Breaking down data silos fosters cross-functional collaboration, as employees can easily access and share procurement insights across teams. This leads to better decision-making and more innovative solutions.

- Knowledge retention: By consolidating historical procurement data, institutional knowledge is preserved, allowing employees to learn from past experiences and apply them to current and future projects.

- Cost optimization: Access to historical pricing and supplier performance data enables better negotiation and vendor selection, potentially leading to cost savings and improved supplier relationships.


More impressive tools exist today for accomplishing tasks like this ([see: GPT-4 w/ Pinecone embeddings](https://www.youtube.com/watch?v=ih9PBGVVOO4)), but when considered in its context two years ago, I think this project effectively demonstrates my commitment to adopting and leveraging new technologies in order to empower myself and others.

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact) for a conversation, or feel free to browse my [other recent projects](/portfolio).
