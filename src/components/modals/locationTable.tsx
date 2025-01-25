import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UpdateLocation from "./updateLocation"
import DeleteLocation from "./deleteLocation"



export default function LocationTable({ locations }: { locations: Array<string> }) {

    return (
        <Table>
            <TableCaption>A list of your recent visited Locations.</TableCaption>
            <TableHeader >
                <TableRow >
                    <TableHead className="text-right">Index</TableHead>
                    <TableHead className="text-right">Location</TableHead>
                    <TableHead className="text-right pr-7">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {locations.map((location, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium text-right">{index + 1}</TableCell>
                        <TableCell className="font-medium text-right">{location}</TableCell>
                        <TableCell className="font-medium text-right">{<UpdateLocation index={index} />}</TableCell>
                        <TableCell className="font-medium text-center">{<DeleteLocation index={index} />}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
