import { useFormik } from "formik";
import * as yup from "yup";
import { ErrorBox } from "@/components/error";
import { useState } from "react";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      citizenship: "",
      idNumber: "",
      otherNames: "",
      surname: "",
      nationality: "",
      passportNumber: "",
      phoneNumber: "",
      emailAddress: "",
      ownerLocation: "",
      businessType: "",
      companyName: "",
      tinNumber: "",
      registrationDate: "",
      businessAddress: "",
      purposeOfImportation: "",
      specificPurpose: "",
      productCategory: "",
      productName: "",
      weight: "",
      productDescription: "",
      unitOfMeasurement: "",
      quantity: "",
    },
    validationSchema: yup.object({
      citizenship: yup.string().required("This field is required"),
      idNumber: yup.string().when("citizenship", {
        is: (citizenship) => citizenship === "Rwandan",
        then: () =>
          yup
            .string()
            .required("This field is required")
            .matches(/[0-9]{16}/i, "Invalid ID number"),
      }),
      otherNames: yup.string().when("citizenship", {
        is: (citizenship) => citizenship === "Foreigner",
        then: () => yup.string().required("This field is required"),
      }),
      surname: yup.string().when("citizenship", {
        is: (citizenship) => citizenship === "Foreigner",
        then: () => yup.string().required("This field is required"),
      }),
      nationality: yup.string().when("citizenship", {
        is: (citizenship) => citizenship === "Foreigner",
        then: () => yup.string().required("This field is required"),
      }),
      passportNumber: yup.string().when("citizenship", {
        is: (citizenship) => citizenship === "Foreigner",
        then: () => yup.string().required("This field is required"),
      }),
      phoneNumber: yup.string().matches(/[0-9]{10}/i, "Invalid phone number"),
      emailAddress: yup
        .string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          "Invalid email address"
        ),
      ownerLocation: yup.string().required("This field is required"),
      businessType: yup.string().required("This field is required"),
      companyName: yup.string().required("This field is required"),
      tinNumber: yup
        .string()
        .matches(/^\d{9}$/i, "Tin number should be 9 digits")
        .required("This field is required"),
      registrationDate: yup.date().required("This field is required"),
      businessAddress: yup.string().required("This field is required"),
      purposeOfImportation: yup.string().required("This field is required"),
      specificPurpose: yup.string().when("purposeOfImportation", {
        is: (purposeOfImportation) => purposeOfImportation === "Other",
        then: () => yup.string().required("This field is required"),
      }),
      productCategory: yup.string().required("This field is required"),
      productName: yup.string().required("This field is required"),
      weight: yup.number(),
      productDescription: yup.string().required("This field is required"),
      unitOfMeasurement: yup.string().required("This field is required"),
      quantity: yup
        .number()
        .positive()
        .required("This field is required")
        .moreThan(0, "Quantity must be greater than 0"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: formik.values }),
      });

      if (response.ok) {
        console.log("Form submitted successfully.");
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white min-w-screen flex flex-col justify-start items-center py-12">
      {isSuccess && (
        <div
          className="fixed z-50 top-4 right-4 p-4 mb-4 text-sm border border-green-600 text-green-600 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span className="font-medium">
            Application submitted successfully. Please check your email for
            confirmation.
          </span>
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-7xl w-[90%] bg-white rounded-md"
      >
        <p className="w-[90%] mb-5 text-2xl text-left text-black font-semibold">
          RICA service form
        </p>
        <div className="border-2 border-blue-600  flex flex-col rounded-md">
          <div className="px-5 items-center py-4 gap-x-1 flex flex-row mb-4 border-b-2 rounded-t-md text-blue-600 bg-blue-100 border-blue-600 p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#2563eb"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                  stroke="#2563eb"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h2 className="text-lg  ">Business owner details</h2>
          </div>
          <div className="mx-10 my-4">
            <p className="font-semibold text-md mb-2">Business Owner Details</p>
            <div>
            <label className="block text-blue-500">
    Applicant citizenship <span className="text-red-500">*</span>
            </label>
              {formik.touched.citizenship && formik.errors.citizenship && (
                <ErrorBox message={formik.errors.citizenship} />
              )}
              <select
                name="citizenship"
                value={formik.values.citizenship}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              >
                <option value="">Select citizenship</option>
                <option value="Rwandan">Rwandan</option>
                <option value="Foreigner">Foreigner</option>
              </select>
            </div>
            {formik.values.citizenship === "Rwandan" && (
              <div>
                <label className="block">
                  Identification Number <span className="text-red-500">*</span>
                </label>
                {formik.touched.idNumber && formik.errors.idNumber && (
                  <ErrorBox message={formik.errors.idNumber} />
                )}
                <input
                  type="text"
                  name="idNumber"
                  placeholder="Enter Identification document number"
                  value={formik.values.idNumber}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            )}
            {formik.values.citizenship === "Foreigner" && (
              <div>
                <div className="flex flex-row gap-x-10">
                  <div>
                    <label className="block">
                      Passport number <span className="text-red-500">*</span>
                    </label>
                    {formik.touched.passportNumber &&
                      formik.errors.passportNumber && (
                        <ErrorBox message={formik.errors.passportNumber} />
                      )}
                    <input
                      type="text"
                      name="passportNumber"
                      value={formik.values.passportNumber}
                      onChange={formik.handleChange}
                      className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                    />
                  </div>

                  <div>
                    <label className="block">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    {formik.touched.nationality &&
                      formik.errors.nationality && (
                        <ErrorBox message={formik.errors.nationality} />
                      )}
                    <input
                      type="text"
                      name="nationality"
                      value={formik.values.nationality}
                      onChange={formik.handleChange}
                      className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-x-10">
                  <div>
                    <label className="block">
                      Surname <span className="text-red-500">*</span>
                    </label>
                    {formik.touched.surname && formik.errors.surname && (
                      <ErrorBox message={formik.errors.surname} />
                    )}
                    <input
                      type="text"
                      name="surname"
                      value={formik.values.surname}
                      onChange={formik.handleChange}
                      className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                    />
                  </div>
                  <div>
                    <label className="block">
                      Other names <span className="text-red-500">*</span>
                    </label>
                    {formik.touched.otherNames && formik.errors.otherNames && (
                      <ErrorBox message={formik.errors.otherNames} />
                    )}
                    <input
                      type="text"
                      name="otherNames"
                      value={formik.values.otherNames}
                      onChange={formik.handleChange}
                      className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-row gap-x-10">
              <div>
                <label className="block text-blue-500">Phone number</label>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <ErrorBox message={formik.errors.phoneNumber} />
                )}
                <input
                  placeholder="Enter phone number"
                  type="tel"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
              <div>
                <label className="block text-blue-500">E-mail address</label>
                {formik.touched.emailAddress && formik.errors.emailAddress && (
                  <ErrorBox message={formik.errors.emailAddress} />
                )}
                <input
                  placeholder="Enter email address"
                  type="email"
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            </div>

            <h2 className="font-semibold text-md mb-2 pt-5">
              Business Owner Address
            </h2>
            <div>
              <label className="block">
                Provinces <span className="text-red-500">*</span>
              </label>
              {formik.touched.ownerLocation && formik.errors.ownerLocation && (
                <ErrorBox message={formik.errors.ownerLocation} />
              )}
              <select
                name="ownerLocation"
                value={formik.values.ownerLocation}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              >
                <option value="">Select Province</option>
                <option value="Kigali">Kigali</option>
                <option value="Western">Western</option>
                <option value="Eastern">Eastern</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-600  flex flex-col rounded-md mt-10">
          <div className="px-5 items-center py-4 gap-x-1 flex flex-row mb-4 border-b-2 rounded-t-md text-blue-600 bg-blue-100 border-blue-600 p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#2563eb"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                  stroke="#2563eb"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h2 className="text-lg  ">Business Details</h2>
          </div>
          <div className="mx-10 my-4">
            <h2 className="font-semibold text-md mb-2 pt-3">
              Business Details
            </h2>
            <div className="flex flex-row gap-x-10">
              <div>
                <label className="block">
                  Business type <span className="text-red-500">*</span>
                </label>
                {formik.touched.businessType && formik.errors.businessType && (
                  <ErrorBox message={formik.errors.businessType} />
                )}
                <select
                  name="businessType"
                  value={formik.values.businessType}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                >
                  <option value="">Enter Business Type</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Manufacturer">Manufacturer</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-500">
                  Company name <span className="text-red-500">*</span>
                </label>
                {formik.touched.companyName && formik.errors.companyName && (
                  <ErrorBox message={formik.errors.companyName} />
                )}
                <input
                  placeholder="Enter company name"
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            </div>
            <div className="flex flex-row gap-x-10">
              <div>
                <label className="block text-blue-500">
                  TIN number <span className="text-red-500">*</span>
                </label>{" "}
                {formik.touched.tinNumber && formik.errors.tinNumber && (
                  <ErrorBox message={formik.errors.tinNumber} />
                )}
                <input
                  placeholder="Enter TIN number"
                  type="number"
                  name="tinNumber"
                  value={formik.values.tinNumber}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
              <div>
                <label className="block text-blue-500">
                  Registration date <span className="text-red-500">*</span>
                </label>
                {formik.touched.registrationDate &&
                  formik.errors.registrationDate && (
                    <ErrorBox message={formik.errors.registrationDate} />
                  )}
                <input
                  placeholder="Select Date"
                  type="date"
                  name="registrationDate"
                  value={formik.values.registrationDate}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            </div>
            <h2 className="font-semibold text-md mb-2 pt-5">
              Business Address
            </h2>
            <div>
              <label className="block text-blue-500">
                Business address <span className="text-red-500">*</span>
              </label>
              {formik.touched.businessAddress &&
                formik.errors.businessAddress && (
                  <ErrorBox message={formik.errors.businessAddress} />
                )}
              <select
                name="businessAddress"
                value={formik.values.businessAddress}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              >
                <option value="">Select Province</option>
                <option value="Kigali">Kigali</option>
                <option value="Western">Western</option>
                <option value="Eastern">Eastern</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-600  flex flex-col rounded-md mt-10">
          <div className="px-5 items-center py-4 gap-x-1 flex flex-row mb-4 border-b-2 rounded-t-md text-blue-600 bg-blue-100 border-blue-600 p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#2563eb"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                  stroke="#2563eb"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h2 className="text-lg  ">Product Information</h2>
          </div>
          <div className="mx-10 my-4">
            <h2 className="font-semibold text-md mb-2 pt-3">
              Importation details
            </h2>
            <div>
              <label className="block">
                Purpose of importation <span className="text-red-500">*</span>
              </label>
              {formik.touched.purposeOfImportation &&
                formik.errors.purposeOfImportation && (
                  <ErrorBox message={formik.errors.purposeOfImportation} />
                )}
              <select
                name="purposeOfImportation"
                value={formik.values.purposeOfImportation}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              >
                <option value="">Select the purpose of importation</option>
                <option value="Direct sale">Direct sale</option>
                <option value="Personal use">Personal use</option>
                <option value="Trial use">Trial use</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <h2 className="font-semibold text-md mb-2 pt-3">Product details</h2>
            {formik.values.purposeOfImportation === "Other" && (
              <div>
                <label className="block">
                  Specify purpose of importation{" "}
                  <span className="text-red-500">*</span>
                </label>
                {formik.touched.specificPurpose &&
                  formik.errors.specificPurpose && (
                    <ErrorBox message={formik.errors.specificPurpose} />
                  )}
                <input
                  type="text"
                  name="specificPurpose"
                  value={formik.values.specificPurpose}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            )}
            <div>
              <label className="block text-blue-500">
                Product category <span className="text-red-500">*</span>
              </label>
              {formik.touched.productCategory &&
                formik.errors.productCategory && (
                  <ErrorBox message={formik.errors.productCategory} />
                )}
              <select
                name="productCategory"
                value={formik.values.productCategory}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              >
                <option value="">Select product category</option>
                <option value="General purpose">General purpose</option>
                <option value="Construction materials">
                  Construction materials
                </option>
                <option value="Chemicals">Chemicals</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-500">
                Product name <span className="text-red-500">*</span>
              </label>
              {formik.touched.productName && formik.errors.productName && (
                <ErrorBox message={formik.errors.productName} />
              )}
              <input
                placeholder=" Enter product name"
                type="text"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              />
            </div>
            <div>
              <label className="block text-blue-500">Weight (kg)</label>
              {formik.touched.weight && formik.errors.weight && (
                <ErrorBox message={formik.errors.weight} />
              )}
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formik.values.weight}
                onChange={formik.handleChange}
                className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
              />
            </div>
            <div className="flex flex-row gap-x-10">
              <div>
                <label className="block text-blue-500">
                  Unit of measurement <span className="text-red-500">*</span>
                </label>
                {formik.touched.unitOfMeasurement &&
                  formik.errors.unitOfMeasurement && (
                    <ErrorBox message={formik.errors.unitOfMeasurement} />
                  )}
                <select
                  name="unitOfMeasurement"
                  value={formik.values.unitOfMeasurement}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                >
                  <option value="">Enter unit of measurement</option>
                  <option value="Kgs">Kgs</option>
                  <option value="Tonnes">Tonnes</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-500">
                  Quantity of product(s) <span className="text-red-500">*</span>
                </label>
                {formik.touched.quantity && formik.errors.quantity && (
                  <ErrorBox message={formik.errors.quantity} />
                )}
                <input
                  placeholder="Enter quantity"
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  className="w-[400px] rounded border px-2 py-2 my-3 border-gray-400 "
                />
              </div>
            </div>
            <div>
              <label className="block text-blue-500">
                Description of products <span className="text-red-500">*</span>
              </label>
              {formik.touched.productDescription &&
                formik.errors.productDescription && (
                  <ErrorBox message={formik.errors.productDescription} />
                )}
              <textarea
                placeholder="Enter product description"
                name="productDescription"
                value={formik.values.productDescription}
                onChange={formik.handleChange}
                className="w-[840px] rounded border px-2 py-2 my-3 border-gray-400 "
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          {" "}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-8 rounded-md mt-4 hover:bg-blue-500 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
