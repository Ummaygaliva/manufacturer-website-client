import React from 'react';

const Blog = () => {
    return (
        <div>
            1..  How will you improve the performance of a React Application?
            1.Keeping component state local where necessary.
            Memoizing React components to prevent unnecessary re-renders.
            Code-splitting in React using dynamic import()
            Windowing or list virtualization in React.
            Lazy loading images in React.
            <br />
            <br />
            2..What are the different ways to manage a state in a React application?
            2.Local state.
            Global state.
            Server state.
            URL state.
            Local (UI) state – Local state is data we manage in one or another component.
            Local state is most often managed in React using the useState hook.
            For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.
            Global (UI) state – Global state is data we manage across multiple components.
            Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.
            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.
            Sometimes state we think should be local might become global.
            Server state – Data that comes from an external server that must be integrated with our UI state.
            Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
            There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.
            Fortunately there are tools such as SWR and React Query that make managing server state much easier.
            URL state – Data that exists on our URLs, including the pathname and query parameters.
            URL state is often missing as a category of state, but it is an important one.
            In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
            There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.
            <br />
            <br />
            3.. How does prototypical inheritance work?
            3.The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
            <br />
            <br />
            4.. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?
            4.Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure.

            <br />
            <br />
            5..What is a unit test? Why should write unit tests?
            5.Import useState and set state variables
            First import useState from React at the top of your App component. Search bar functionality calls for setting a state variable that changes based on the input value of the bar.
            Define a callback function and pass it down as a prop
            The purpose of the function “handleSearch” is to retrieve a value from our search component and set our state variable “searchQuery” to the input value of the search bar. I’ve also included logic within this function that maps over every string element in the “people” array, inquires if that element includes the value set in our search bar, and then sets our state variable “filteredName” to that element, a single name, which will be returned in red as seen in the example above.
            Set an “onChange” event handler on the input field
            Within the child Search Component, set an “onChange” event handler on the input field (the search bar, itself). The purpose of the “onChange” event in react is detecting when a change is made in an input field.
            (Console.log(e.target.value) to see the characters logged as you type them within the search bar!)

        </div>
    );
};

export default Blog;