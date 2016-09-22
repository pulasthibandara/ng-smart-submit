## ng-smart-submit
*Adds smart features to default ng-submit*

### Features
---
1. **$submitProgress**
    
    Adds property to FormController, which indicates if a form is been submitted
2. **resetOnSubmit** 

    Clears the form and set states pristine after form submission

### Installation
---
*Not formally released on bower until unit tests are done*

```bash
bower install --save pulasthibandara/ng-smart-submit
```

### Use
---

#### 1. Submit progress

The module decorates angular's default ng-submit directive

The if the function called by ng-submit returns a Promise, $submitProgress
property will be set true until the promise resolves or rejects

```html
<form ng-submit="submit( model )" name="testForm">
    <input type="text" required ng-model="model.name" name="name">
    <button 
        type="submit"
        ng-disable="testForm.$submitProgress || testForm.$invalid" >
    </button>
    <!-- show loader on submit -->
    <img src="progress.gif" alt="form progress">
</form>
```

#### 1. Form reset

```html
<form 
    novalidate 
    ng-submit="submit( model )" 
    reset-on-submit="{ model: data.link, value: {} }" 
    name="testForm">
</form>
```

reset-on-submit directive accepts an object with two properties
- model: The data model used in the form
- value: The value that the model should reset to

