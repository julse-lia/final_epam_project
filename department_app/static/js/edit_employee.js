
async function putFormDataAsJson({ url, formData }) {
    const formDataJsonString = JSON.stringify(formData);

    const fetchOptions = {
        /**
         * The default method for a request with fetch is GET,
         * that uses the POST HTTP method.
         */
        method: "PUT",
        /**
         * These headers will be added to the request and tell
         * the API that the request body is JSON and that we can
         * accept JSON responses.
         */
        headers: {
            "Content-Type": "application/json"
        },
        /**
         * The body of our POST request is the JSON string
         * created above.
         */
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}
/**
 * Event handler for a form submit event.
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    /**
     * This prevents the default behaviour of the browser submitting
     * the form so that we can handle things instead.
     */
    event.preventDefault();
    /**
     * Inserting form data values into formData dictionary
     */
    const formData = {};
    formData['name'] = document.getElementById('name').value;
    formData['birth_date'] = document.getElementById('birth_date').value;
//    formData['department_uuid'] = document.getElementById('department').value;
    formData['salary'] = document.getElementById('salary').value;

    if (!formData['name'].replace(/\s/g, '').length) {
       document.getElementById('name_error').innerHTML = 'Invalid employee name.';
    }

    /**
     * This holds the API URL.
     */
    let uuid = location.href.split("/").slice(-1)[0];
    var department_uuid = document.getElementById('department').value;
    const url = "/api/employees/" + `${uuid}?department_uuid=${department_uuid}`;

    try {
        const responseData = await putFormDataAsJson({ url, formData });
//        console.log({ responseData });
        location.replace("/employees")
    } catch (error) {
        console.error(error);
    }
}

const editEmployeeForm = document.getElementById("editEmpForm");
editEmployeeForm.addEventListener("submit", handleFormSubmit);

/**
*  Fill edit form with data from get method response
*/
/**
 * This holds the API URL.
 */
let uuid = location.href.split("/").slice(-1)[0];
const url = "/api/employees/" + `${uuid}`;
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('name').value = data['name'];
        document.getElementById('birth_date').value = data['birth_date'];
        document.getElementById('department').value = data['department_uuid'];
        document.getElementById('salary').value = data['salary'];
    });

