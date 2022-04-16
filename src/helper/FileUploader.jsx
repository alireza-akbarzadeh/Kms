import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

class FileUploader extends Component {
    static defaultProps = {
        showPreview: true,
    };

    constructor(props) {
        super(props);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);

        this.state = {
            selectedFiles: [],
        };
    }

    /**
     * Handled the accepted files and shows the preview
     */

    handleAcceptedFiles = (files) => {
        var allFiles = files;

        if (this.props.showPreview) {
            files.map((file) =>
                Object.assign(file, {
                    preview:
                        file["type"].split("/")[0] === "image"
                            ? URL.createObjectURL(file)
                            : null,
                    formattedSize: this.formatBytes(file.size),
                })
            );

            // allFiles = this.state.selectedFiles
            // allFiles.push(...files)
            this.setState({ selectedFiles: files });
        }

        if (this.props.onFileUpload) this.props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    formatBytes = (bytes, decimals) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    render() {
        return (
            <React.Fragment>
                <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => this.handleAcceptedFiles(acceptedFiles)}
                    uploadMultiple={false}
                    accept={"image/jpeg, image/png"}
                    {...this.props}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="dropzone text-center border shadow-sm w-100" style={{ width: "100%" }}>
                            <div className="dz-message py-5 needsclick" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <i className="h1 text-muted uil-cloud-upload" />
                                <div
                                    className="d-flex justify-content-center"
                                    style={{ text: "center" }}
                                >
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    )}
                </Dropzone>
                {this.props.showPreview && (
                    <div className="dropzone-previews mt-3" id="file-previews">
                        {this.state.selectedFiles.map((f, i) => {
                            return (
                                <div
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                >
                                    <div className="p-2">
                                        <Row>
                                            {f.preview && (
                                                <div className="col-auto">
                                                    <img
                                                        data-dz-thumbnail=""
                                                        height="150px"
                                                        style={{ width: "100%", margin: "10px 0", objectFit: "cover" }}
                                                        className="avatar-sm rounded bg-light p-3 d-flex justify-content-center h-25"
                                                        alt={f.name}
                                                        src={f.preview}
                                                    />
                                                </div>
                                            )}
                                            {!f.preview && (
                                                <div className="col-auto">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-primary rounded">
                                                            {f.type.split("/")[0]}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </Row>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default FileUploader;

const Row = styled.div``;
