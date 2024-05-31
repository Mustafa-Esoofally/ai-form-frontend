export async function chunkAddress(mailingaddress: string) {
  console.log("line 2 chunkaddress function called");
  console.log(mailingaddress);
  const res = await fetch("http://localhost:8000/address_chunk/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mailing_address: mailingaddress,
    }),
  });

  const data = await res.json();
  return data.chunked_mailing_address;
}

export async function submitForm(formData:any) {
  console.log("line 20 submit form action called");
  const res = await fetch("http://localhost:8000/save_address/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}
