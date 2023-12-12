import AccountLayout from "@/components/AccountLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
`
const SettingsFrom = styled.div`
  max-width: 400px;
`

export default function SettingsPage() {
  
  const [accountInfo, setAccountInfo] = useState({});
  const {data: session} = useSession();
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    if (session?.user) {
      axios.get('/api/customer?email=' + session?.user?.email).then(response => {
        setAccountInfo(response.data);
      })
    }
  }, [session])

  useEffect(() => {
    setSaved(false);
  }, [accountInfo])

  async function saveInfo() {

    await axios.post('/api/customer', accountInfo).then(() => {
      setSaved(true);
    });
  }

  return (
    <AccountLayout>
      <h2>Settings</h2>
      <SettingsFrom>
        <div>
          <Input placeholder=" " type="text" name="Name" onChange={(event) => setAccountInfo(info => {
            return {...info, name: event.target.value}
          })}
          value={accountInfo?.name || ''}
          />
          <label>Name</label>
        </div>
        <div>
          <Input placeholder=" " type="email" name="Phone" onChange={(event) => setAccountInfo(info => {
            return {...info, phone: event.target.value}
          })}
          value={accountInfo?.phone || ''}
          />
          <label>Phone</label>
        </div>
        <div>
          <Input placeholder=" " type="email" name="Email" onChange={(event) => setAccountInfo(info => {
            return {...info, email: event.target.value}
          })}
          value={accountInfo?.email || ''}
          />
          <label>Email</label>
        </div>
        <Flex>
          <div>
            <Input placeholder=" " type="text" name="City" onChange={(event) => setAccountInfo(info => {
              return {...info, city: event.target.value}
            })}
            value={accountInfo?.city || ''}
            />
            <label>City</label>
          </div>
          <div>
            <Input placeholder=" " type="text" name="Zip" onChange={(event) => setAccountInfo(info => {
              return {...info, zip: event.target.value}
            })}
            value={accountInfo?.zip || ''}
            />
            <label>ZiP code</label>
          </div>
        </Flex>
        <div>
          <Input placeholder=" " type="text" name="Address" onChange={(event) => setAccountInfo(info => {
            return {...info, address: event.target.value}
          })}
          value={accountInfo?.address || ''}
          />
          <label>Adress</label>
        </div>
        <div>
          <Input placeholder=" " type="text" name="Country" onChange={(event) => setAccountInfo(info => {
            return {...info, country: event.target.value}
          })}
          value={accountInfo?.country || ''}
          />
          <label>Country</label>
        </div>
        <Button onClick={() => saveInfo()}>Save</Button> {saved && <span>Saved!</span>}
      </SettingsFrom>
      
    </AccountLayout>
  )
}