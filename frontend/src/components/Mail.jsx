import React, { useState } from 'react'
import axios from "axios"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Mail = ({user}) => {
    const [to, setto] = useState("");
    const [subject, setsubject] = useState("");
    const [desc, setdesc] = useState("");
    const [scheduleSelected, setscheduleSelected] = useState("");

    const handleSub = (e) => {
        e.preventDefault()
        console.log("hi");
        const mail = {
            to: to,
            subject: subject,
            description: desc,
            scheduleSelected: scheduleSelected
        }
        const url = "http://localhost:5000/create_mail/"+user
        axios.post(url, mail).then((res) => console.log(res.data));
    }
    return (
        <>
            <form onSubmit={handleSub}>
                <section className="mail px-5 py-5 vh-100">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">To</label>
                        <input type="email" name="email" value={to} onChange={(e) => setto(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Subject</label>
                        <input type="text" name="subject" value={subject} onChange={(e) => setsubject(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3" >
                        <CKEditor style={{ height:"50vh"}}
                        editor={ ClassicEditor }
                        data="<p>Type your mail body</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setdesc(data);
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                />
                </div>



                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Recurring</label>
                        <input type="text" name="recur" value={scheduleSelected} onChange={(e) => setscheduleSelected(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <input type="submit" value="submit" className="btn btn-warning" />
                </section>
            </form>

        </>
    )
}

export default Mail