"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { chunkAddress, submitForm } from "@/app/actions";

import { Separator } from "@/components/ui/separator";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function ProfileForm() {
  const [mailingAddress, setmailingAddress] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [city, setcity] = useState("");
  const [state_province, setstate_province] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [country, setcountry] = useState("");
  const [loading, isloading] = useState(false);
  const [error, seterror] = useState(false);

  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log("line 2 submit form handler function called");
    var formData = {
      final_mailing_address: mailingAddress,
      street_address: streetAddress,
      city: city,
      state_province_region: state_province,
      postal_code: postalcode,
      country: country,
    };
    submitForm(formData);
  }

  async function chunkAddressHandler() {
    console.log(mailingAddress);
    if (!mailingAddress) {
      seterror(true);
      return;
    }
    seterror(false);
    isloading(true);
    var chunked_address = await chunkAddress(mailingAddress);
    chunked_address = JSON.parse(chunked_address);
    console.log(chunked_address);
    setstreetAddress(chunked_address.street_address);
    setcity(chunked_address.city);
    setstate_province(chunked_address.state_province_region);
    setpostalcode(chunked_address.postal_code);
    setcountry(chunked_address.country);

    isloading(false);
  }

  return (
    <div className="flex flex-col w-full max-w-lg py-12 mx-auto stretch">
      {loading && <PropagateLoader color="#36d7b7" />}
      <form onSubmit={formSubmitHandler} className="flex flex-col gap-y-2">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Mailing address
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          Type your entire mailing address below and we&apos;ll take care of the rest
        </p>

        <div className="grid w-full gap-1.5">
          <Textarea
            placeholder="Mailing address"
            id="mailingaddress"
            name="mailingaddress"
            onBlur={chunkAddressHandler}
            onChange={(event) => setmailingAddress(event.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500">Mailing Address Cannot be empty</p>
        )}

        <Separator className="my-4" />
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={streetAddress}
                onChange={(event) => setstreetAddress(event.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3 sm:col-start-1">
            <Label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={city}
                onChange={(event) => setcity(event.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={state_province}
                onChange={(event) => setstate_province(event.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={postalcode}
                onChange={(event) => setpostalcode(event.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                name="country"
                id="country"
                autoComplete="country"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={country}
                onChange={(event) => setcountry(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 mx-auto">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
