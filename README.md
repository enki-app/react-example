# Enki-sdk react example

## How to use the library

## Required Values

- API key
- Element Id
- Application ID

## Optional Values

- Endpoint (optional)
- Profile (optional)

## Install the SDK

Install enki-sdk using **npm**

```
npm install enki-sdk
```

or through **yarn**

```
yard add enki-sdk
```

## Import and Consume

**For importing we have 2 Ways:**

**1. Through direct function call**

- Import function

```
import {getHydratedConfigs} from "enki-sdk"
```

- Add this piece to your code to fetch configs

```
const data = await getHydratedConfigs("<Your API Key>","<Element ID>","<Application ID>","<Profile 'Optional!'>","<Endpoint 'Optional!'>'")
```

- To see fetched data you can write

```
console.log(data)
```

**2. Through default module EnkiSDK**

- Import default module

```
import EnkiSDK from 'enki-sdk'
```

- Initialize object

```
const enkiSdkObject = new EnkiSDK("<Your API Key>","<Application ID>","<Profile 'Optional!'>","<Endpoint 'Optional!'>'")
```

- Use the following to fetch configs

```
const data = enkiSdkObject.getHydratedConfigs("<Element ID>")
```

## Output

When using `console.log(data)` the returned data object is going to be in the following shape which allows you to map and consume easily in your system:

```

Returned Object

{
    elementId: '<Element ID>',
    data: [An Array of Configs]
}

Configs Array sturcture
{
    key: '<Key Name>',
    value: {
        value: '<Config Value>',
        datatype: '<Data type of this value>'
    }
}
```
