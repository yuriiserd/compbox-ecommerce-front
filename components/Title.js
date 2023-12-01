import { primary } from "@/lib/colors";



export default function Title({children}) {
  
  return (
    <h2 style={{
      marginBottom: '2rem',
      fontSize: '2rem',
      color: primary,
    }}>{children}</h2>
  )
}