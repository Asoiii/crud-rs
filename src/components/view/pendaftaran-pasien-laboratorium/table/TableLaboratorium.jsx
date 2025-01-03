"use client";
import TextField from "@/components/ui/text-field";
import { dataBayi } from "@/utils/config";
import React, { useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const TableLaboratorium = ({
  headers,
  data,
  onAdd,
  onSearch,
  actions,
  id,
  title,
}) => {
  const methods = useForm();

  const [filters, setFilters] = useState({
    noRekamMedis: "",
    nama: "",
    ruang: "",
    dokter: "",
  });
  const [filteredPatients, setFilteredPatients] = useState(dataBayi);

  // Fungsi untuk mengupdate filter
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Fungsi untuk memfilter data pasien
  const applyFilters = (filters) => {
    const filtered = dataBayi.filter((patient) => {
      const matchNoRekamMedis = filters.noRekamMedis
        ? patient.noRekamMedis
            ?.toLowerCase()
            .includes(filters.noRekamMedis.toLowerCase())
        : true;
      const matchNama = filters.nama
        ? patient.nama?.toLowerCase().includes(filters.nama.toLowerCase())
        : true;
      const matchRuang = filters.ruang
        ? patient.ruang?.toLowerCase().includes(filters.ruang.toLowerCase())
        : true;
      const matchDokter = filters.dokter
        ? patient.dokter?.toLowerCase().includes(filters.dokter.toLowerCase())
        : true;

      return matchNoRekamMedis && matchNama && matchRuang && matchDokter;
    });
    setFilteredPatients(filtered);
  };

  return (
    <FormProvider {...methods}>
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className="iq-card">
              <div className="iq-card-header">
                <div className="iq-header-title mb-3">
                  <h4 className="card-title mt-4 mb-2">{title}</h4>
                </div>

                {/* Form Input */}
                <Row className="align-items-end">
                  <Col xs="6" lg="4">
                    <TextField
                      label="Cari Nama Pemeriksaan :"
                      name="Cari Nama Pemeriksaan"
                      type="text"
                      placeholder="Enter your Cari Nama Pemeriksaan..."
                      className="form-control mb-0"
                      rules={{
                        required: "Cari Nama Pemeriksaan is required",
                      }}
                      onChange={(e) =>
                        handleFilterChange("noRekamMedis", e.target.value)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <Button className="btn btn-sm btn-warning me-3">
                      Tindakan
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="iq-card-body">
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                      {actions &&
                        (actions.edit || actions.delete || actions.detail) && (
                          <th>Actions</th>
                        )}
                    </tr>
                  </thead>
                  {/* <tbody>
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.entries(row)
                            .filter(([key]) => key !== id)
                            .map(([key, value], colIndex) => (
                              <td key={colIndex}>{value || "-"}</td>
                            ))}
                          {actions &&
                            (actions.edit ||
                              actions.delete ||
                              actions.detail) && (
                              <td className="d-flex justify-content-center align-items-center">
                                {actions.edit && (
                                  <Button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => actions.edit(row)}
                                  >
                                    Registrasi Bayi
                                  </Button>
                                )}
                                {actions.delete && (
                                  <Button
                                    className="btn btn-sm btn-danger me-2"
                                    onClick={() => actions.delete(row)}
                                  >
                                    Delete
                                  </Button>
                                )}
                                {actions.detail && (
                                  <Button
                                    className="btn btn-sm btn-info"
                                    onClick={() => actions.detail(row)}
                                  >
                                    Detail
                                  </Button>
                                )}
                              </td>
                            )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={
                            headers.length +
                            (actions &&
                            (actions.edit || actions.delete || actions.detail)
                              ? 1
                              : 0)
                          }
                          className="text-center"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody> */}
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </FormProvider>
  );
};

export default TableLaboratorium;
