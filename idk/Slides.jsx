<>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {Array.isArray(msg.content) && msg.content.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {msg.content.map((slide, index) => (
                            <div
                              key={index}
                              className="p-4 border rounded-lg shadow-sm bg-white"
                            >
                              <h3 className="text-lg font-semibold text-gray-900">
                                {slide.title}
                              </h3>
                              <p className="mt-2 text-gray-700 whitespace-pre-line">
                                {slide.content}
                              </p>

                              {/* Display Testimonials if available */}
                              {slide.testimonials &&
                                slide.testimonials.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-md font-semibold text-gray-800">
                                      Testimonials:
                                    </h4>
                                    <ul className="list-disc list-inside mt-1 text-gray-600">
                                      {slide.testimonials.map(
                                        (testimonial, i) => (
                                          <li key={i}>{testimonial}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>