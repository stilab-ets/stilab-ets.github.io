# Check list for writing technical papers
## STIL Lab@ETS Montreal

Title: ...
Leading author: ...

### Draft Issues
- [ ] Make sure your draft has a descriptive name and increasing version number so we can distinguish the versions
- [ ] Always include a PDF with the diff compared to the previous version you sent us

### General Issues
- [ ] So what? — What is the key value of this work? Is it of value to practitioners or researchers or both? Can you say it in one sentence
- [ ] What are the five key terms of the paper? Are you consistent on them or are you switching terms with similar ones? (same holds for any term)

### Introduction Issues
- [ ] Introduction fits in one page (for a two-columns conference paper), or two pages (for journal)
- [ ] A short summary of the results (or of each RQ) is shown on the first page with one liner key findings
- [ ] List the three important points that you want to raise in this paper
- [ ] List the point of each paragraph of the introduction section — That point should be the first line of that paragraph. The rest of paragraph should just support that point. (Check this
throughout the paper)

#### Introduction Structure
  - [ ] P1: Why is this important
  - [ ] P2: What others have done
  - [ ] P3: What is your neat point
  - [ ] P4: What are your RQs — For each RQ
  - [ ] One line motivation
  - [ ] One line key finding (with implication)


### Approach Issues
- [ ] Do you have a data flow diagram in the paper that explains how the approach works or how the data is gathered and the final output
- [ ] The figure should be readable in black and white - boxes are processes, and file icons are inputs
- [ ] The figure should be more elaborate not just a straight line that can be replaced by a numbered list
- [ ] The steps in the figure should be grouped into sections. Each section should have a title that matches exactly the title of a subsection (or paragraph) of the approach section in the text.


### Findings
- [ ] The paper should be broken along 3-4 RQs.
- [ ] The RQs should be related - what is the relation?
- [ ] The RQs should be independent, i.e., the motivation of an RQ cannot be the findings of another RQ (otherwise this is more a discussion point instead of an RQ).
- [ ] Each RQ has a motivation, approach and findings. Indicate these explicitly in the text (e.g., "Motivation: …").
- [ ] Each paragraph has a key point that shows up as its first line.
- [ ] Are the figures/tables supporting your point directly or do people need to do mental math to get the point. If so then rework the figures\tables so the results are obvious. Create
the figure\table that requires zero thinking form the reviewer to see your point.


### Related Work
- [ ] Is it at the front of the paper or the back? Why front? Unless used to motivate the work then it should go in the back.
- [ ] If at the front then you should end each paragraph with key take home messages.
- [ ] Did you group the different lines of work under themes? Do not just have a listing of one paper after the other.
- [ ] Make sure that you explain why/how your work is different from existing work.


### General Quality Control
#### 1. Check all your figures:
- [ ] Are they made in R and exported as PDF? Never use Excel (or similar) to create figures for a paper.
- [ ] Are all axes labeled?
- [ ] Is their scale OK? (no weird zoomed-in scales when it is not necessary)
- [ ] Are the labels and other text in them readable? Text in a figure should be at least as big as the caption below it.
- [ ] Are the labels self-contained?
- [ ] Is the caption of the figure self-contained, i.e., describes its context and content without need to read the whole paper?
- [ ] Are they generated consistently using the same style, color scheme and
libraries?
- [ ] No space-fillers (graphs that are way too large for what they are showing and are clearly there to fill up space in the paper)


#### 2. Check all your tables
- [ ] Are they self-contained?
- [ ] Are they compact? (no duplicate data when unnecessary)
- [ ] Do they actually contribute to your work, other than dumping a bunch of data?
- [ ] Right-align numerical columns and make sure the numbers in a column use the same number of decimals.

#### 3. General checks
- [ ] Use active section headers, so 'Generating Test Cases' instead of 'Test Case Selection'
- [ ] For the European guys/reviewers :) separate thousands with a comma in numbers, e.g., 1,000 instead of 1000.
- [ ] When you make a change, e.g., in terminology in a part of your paper, make sure that is changed throughout the paper!
- [ ] Avoid more than 3 nouns back to back, e.g., “issue-tracking system classification performance” -> “the classification performance of an issue-tracking system”.
- [ ] Use consistent terminology throughout the paper, so pick one word to describe something and stick to that.
- [ ] If you have issues with grammar or writing style, make an appointment with the writing centre and see how they can help you. They are professionals specialized in helping you improve your writing.
- [ ] Do not cite a paper for something that it does not claim - it will really annoy a reviewer and they will mistrust all your citations!
- [ ] Always make sure they use examples and that the examples are very clear and basic. Often students will say for example, and then give an even more abstract example — you want very concrete and simple examples.
- [ ] AND and THEN are the same so you should not be saying "and then" just like what I did in the previous point ;)
- [ ] Remember the burden is on the writer not on the reviewer — any CS person should be able to grasp your paper.

#### 4. Some LaTeX tips (your co-authors will thank you):
- [ ] Writing a paper in Word is not an option.
- [ ] If you decide to use Overleaf (my ideal choice), make sure that the source code of your paper is available once you start working with others. Not everyone likes the online editors. This will be needed later as source files should compile in the journal submission system
- [ ] Check that your paper is in the right conference/journal style!
- [ ] Use the booktabs package to style your tables. Avoid using solid lines unless absolutely necessary. For most tables, the following format is OK:
  - ``` \toprule ```
  - ``` Headers (in bold) ```
  - ``` \midrule ```
  - ``` Table contents ```
  - ``` \bottomrule ```
- [ ] Prefix your labels for figures, tables, sections with respectively “fig:”, “tab:”, “sec:”. Do not use “subsec:” (or similar) for labels.
- [ ] Do not use labels that are tied to the layout of your paper. So for example, do not use “sec:rq1” as a label but instead use “sec:classification-model”. This allows you to move around sections without making a mess of your labels and references.
- [ ] Order your citations alphabetically by last name. There is a way to do this in every conference/journal style.








