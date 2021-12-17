import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen } from '@testing-library/react'
import {article} from './Article'

const testArticle = {
    id: 'aMqwd', //unique article id
    headline: "headline", //title of article
    createdOn: '2021-08-09T18:02:38-04:00', //timestamp of when article was added
    author: '', //author
    image: "", //image
    summary: "summary", //short summary statement of article
    body: ""  //paragraph of article text
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>)

    const headline = screen.getByTestId("headline");
    const author = screen.getByTestId("author");
    const summary = screen.getByTestId("summary");
    const body = screen.getByTestId("body");

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle}/>)

    const associatedPress = screen.queryByText(/associated press/i);

    expect(associatedPress).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={testArticle} handleDelete={handleDelete}/>)

    const deleteButton = screen.getByTestId("deleteButton")
    const date = screen.queryByText(/2021-08-09T18:02:38-04:00/i)
    
    userEvent.click(deleteButton)
    expect(handleDelete).toBeCalled();
    expect(date).not.toBeInTheDocument()

});

//Task List:
//1. Complete all above tests. Create test article data when needed.

// * [ ] Build a test that shows the `Article` component, given the correct props, can render without errors.
// * [ ] Build a test that shows that when a correctly formatted article is passed into the `Article` component, the correct headline, author, summary and body are displayed.
// * [ ] The `Article` component should display "Associated Press" when an author attribute is not avalible. Build a test that verifies that that is true.
// * [ ] Build a test that show that when the deleteButton is pressed on an Article, the handleDelete functional property is executed.